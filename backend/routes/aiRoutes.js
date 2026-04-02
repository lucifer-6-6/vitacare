
const router = require("express").Router();
router.post("/chat",(req,res)=>res.json({reply:"AI response"}));
module.exports = router;
