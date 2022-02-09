module.exports = {
    rmqUser: process.env.RMQ_USER || "guest" ||"admin",
    rmqPassword: process.env.RMQ_PASSWORD || "guest",
    rmqHost: process.env.RMQ_HOST || "localhost:5672" ,
    apiReleaseStage: process.env.API_RELEASE_STAGE || "development",
    apiPort:process.env.API_PORT || 3003

}