const rmq = require('rmq-connect');
const config = require('./config/config');
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const version = require('./package.json').version;
const app = express();
const port = config.apiPort;
const messageLimit = 1;
const db = require("./utils/database");
let client = null;



let rmqServer = `${config.rmqUser}:${config.rmqPassword}@${config.rmqHost}`;
let queue = `${config.apiReleaseStage}_real_time_datafeeder`;
//development_real_time_datafeeder
db.init('local')

if (cluster.isMaster) {
    os.cpus().map(() => {
        cluster.fork();
    });
    console.log(os.cpus());
} else {
    app.get('/status', function (req, res) {
        res.send(`{"status":"ok", "version":${version},"cluster_worker":${cluster.worker.id},"consumes_queue":"${queue}"}`);
    });
    app.listen(port, () => {
        console.log("Analytics data feeder consumer initializing completed and running on port: ", port);
    });
    rmq.consumeMessages(rmqServer, queue, consumeMessagesCallback, messageLimit);
}

cluster.on('exit', () => {
    cluster.fork();
});

function consumeMessagesCallback(err, msg, done) {
    if (err) {
        console.error('Error1: ', err);
        console.info('Retrying in 1000ms');
        setTimeout(() => {
            rmq.consumeMessages(rmqServer, queue, consumeMessagesCallback, messageLimit);
        }, 1000);
    }
    if (typeof msg == 'string') {
        msg = JSON.parse(msg);
    }
    if (!msg) {
        msg = {};
    }

    if (!msg) {
        rmq.connect(`${config.rmqUser}:${config.rmqPassword}@${config.rmqHost}/insyt`, `esoko_exchange_${config.apiReleaseStage}`)
            .then(cnx => {
                rmq.publishJSON(cnx, `real_time_${config.apiReleaseStage}`, config.rmqErrorsBindKey, {
                    consumer: queue,
                    payload: msg,
                    reason: `some data needed to send slack notification not provided`,
                    severity: `critical`
                });

                rmq.closeConnection(cnx);
                done();
            }).catch(err => {
                console.log("Error1: ", err);
            });
        return
    }
    db.connect().then(connection => {
        return connection;
    }).then(connection => {
        client = connection
        return creatMessage(db, client, msg);

    }).then((response) => {
        console.log(`message with id ${response[0].id} is inserted successfully`)
        db.commitAndRelease(client)
        done()
    }).catch(err => {
        console.log(err);
        done()

    })
   
}

function creatMessage(db, connection, msg) {
    return new Promise((resolve, reject) => {
        let sql = "insert into messages(message,author,message_room,message_time,message_between) values ($1,$2,$3,$4,$5) returning id";
        let { message, author, room, time, between } = msg;
        let params = [message, author, room, time, JSON.stringify(between) ]
        db.query(connection, sql, params, (err, response) => {
            if (err) {
                return reject(err);
            }
            return resolve(response.rows)
        })
    })
}













