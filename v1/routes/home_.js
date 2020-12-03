const express = require("express");
const router = express.Router();
var {log_home,log_office} = require('../controllers/log_reg')

router.get('/home',log_home,(req,res,next)=>{

})

router.get('/office',log_office,(req,res,next)=>{
    
})

module.exports = router;