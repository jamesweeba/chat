const { Pool } = require("pg");
var pool = new Pool({});
const db_config = require("../db_config/dbconfig")



module.exports = {
    init: function (db = "local") {
        console.log("[DB] initializing", db_config.postgresqldb[db])
        pool = new Pool(db_config.postgresqldb[db]);
        pool.on("acquire", () => {
            console.log("connection acquired");
        });
        pool.on("error", (err) => {
            console.log(err)
        })
        pool.on("remove", () => {
            console.log("connection removed")
        })
    },

    connect: function () {
        return new Promise((resolve, reject) => {
            pool.connect().then(client => {
                return client;
            }).then(client => {
                client.query('BEGIN')
                return resolve(client)
            }).catch(err => {
                return reject(err);
            })
        })

    },
    query: function (client, sql, params, cb) {
        client.query(sql, params, (err, res) => {
            console.log("[database : query] Executed Query :", {
                sql,
                rowCount: res ? res.rowCount : 0,
                err
            });
            if (err) return cb(err, null);

            return cb(err, res);
        })

    },

    commitAndRelease: function (client) {
        return new Promise((resolve, reject) => {
            client.query("COMMIT", (err) => {
                client.release()
                if (err) return reject(err);
                console.log("clinet relased succesfully")
                return resolve('commited succesfully')

            })

        })

    }
}