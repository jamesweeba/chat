const router = require("express").Router();
const {createUser}=require("./service")


router.post("/",createUser)

module.exports=router;