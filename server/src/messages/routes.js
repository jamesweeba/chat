const router = require("express").Router();
const {saveMessage,fetchMessages} =require("../messages/service")
router.post("/",saveMessage);
router.get("/",fetchMessages);



module.exports=router;