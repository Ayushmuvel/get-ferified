const express = require("express");
const router = express.Router();
const off_fun = require('../controllers/office_')
const up_off_fun = require('../services/office_')


router.get('/app_doc',off_fun.app_list,(req,res,next)=>{

})

router.get('/deAc_ac',up_off_fun.deAc_ac,(req,res,next)=>{
    
})

router.post('/check_cer',off_fun.check_cer,(req,res,next)=>{
})

router.post('/cer_app',up_off_fun.app_cer_check,(req,res,next)=>{
    
})

router.get('/Ac_ac',off_fun.deAc_lis,(req,res,next)=>{
    
})

router.post('/Ac_ac',up_off_fun.ac_de_ac,(req,res,next)=>{

})

module.exports = router;