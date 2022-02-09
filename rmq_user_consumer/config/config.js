module.exports = {
    rmqUser: process.env.RMQ_USER ||"kuphrfng"|| "guest" ||"admin",
    rmqPassword: process.env.RMQ_PASSWORD ||"XiSF8kPRamIzoKLXXDIwoshRsbkPyTz1" ||"guest",
    rmqHost: process.env.RMQ_HOST || "jaguar.rmq.cloudamqp.com"||"localhost:5672" ,
    apiReleaseStage: process.env.API_RELEASE_STAGE || "development",
   apiPort:process.env.API_PORT || 3002

}