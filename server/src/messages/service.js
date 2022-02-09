const { publishToRmq } = require("../utils/utils")
const config = require("../conf/conf");


function saveMessage(req, res) {
    let dataset = req.body;
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    console.log(dataset);
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    let bindKey =  `${config.apiReleaseStage}.realtime.datasets` ||`esoko.${config.apiReleaseStage}.insyt.records.datasets`;
    publishToRmq(bindKey, dataset);
    return res.status(201).json({ "message": "message created succesfully", "statusCode": "201" });
}

function fetchMessages(req, res) {
    return res.status(201).json({ "message": "message created succesfully", "statusCode": "201" });

}



module.exports = {
    saveMessage,
    fetchMessages
}