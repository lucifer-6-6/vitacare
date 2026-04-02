
const router = require("express").Router();
router.post("/",(req,res)=>res.json({risk:"Low"}));
module.exports = router;
