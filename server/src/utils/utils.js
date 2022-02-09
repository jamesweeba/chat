const config = require("../conf/conf");
const rmq = require('rmq-connect');

function publishToRmq(bindKey, dataset) {
    return new Promise((resolve, reject) => {
        // let rmqServer = `${config.rmqUser}:${config.rmqPassword}@${config.rmqHost}/${config.rmqUser}`;
        let rmqServer = `${config.rmqUser}:${config.rmqPassword}@${config.rmqHost}/${config.rmqUser}`;
        let exchange = `real_time_${config.apiReleaseStage}`;
        //`real_time_${config.apiReleaseStage}` ||
        // let bindKey = `esoko.${config.apiReleaseStage}.insyt.records.datasets`
        rmqServer="kuphrfng:XiSF8kPRamIzoKLXXDIwoshRsbkPyTz1@jaguar.rmq.cloudamqp.com/kuphrfng"
        rmq.connect(rmqServer, exchange).then(cnx => {
            rmq.publishJSON(cnx, exchange, bindKey, dataset);
            return resolve("data published succesfully")
        }).catch(err => {
            console.log(err);
            console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
            return reject(err);
        })
    })
}



module.exports = {
    publishToRmq
}