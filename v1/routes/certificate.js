const express = require("express");
const router = express.Router();

// file upload systerm
var fs = require('fs');
//require('dotenv/config');
var multer = require('multer');

var storage = multer.diskStorage({ 
    destination:async (req, files, cb) => { 
        // console.log(files)
        await cb(null, 'v1/uploads') 
    }, 
    filename: async(req, files, cb) => { 
        // console.log(files)
        await cb(null, files.fieldname + '-' + Date.now()) 
    } 
});
var upload = multer({ storage: storage });

var{add_edu_cer,add_work_exp,add_cer,add_proj,add_skill} = require('../services/certificate')
const cer_dipl = require('../controllers/certificate')

router.post('/edu/set',upload.array('image',1),add_edu_cer,(req,res,next)=>{

})

router.get('/edu/display',cer_dipl.edu_disp,(req,res,next)=>{
    
})

router.post('/work/set',upload.array('image',1),add_work_exp,(req,res,next)=>[

])

router.get('/work/dipslay',cer_dipl.work_exp_disp,(req,res,next)=>{

})

router.post('/cer/set',upload.array('image',1),add_cer,(req,res,next)=>{

})

router.get('/org_cer/dipslay',cer_dipl.org_cer_disp,(req,res,next)=>{

})

router.post('/proj/set',upload.array('image',1),add_proj,(req,res,next)=>{

})

router.get('/proj/display',cer_dipl.proj_disp,(req,res,next)=>{

})

router.post('/skill/set',upload.array('image',1),add_skill,(req,res,next)=>{

})

router.get('/skill/display',cer_dipl.skill_disp,(req,res,next)=>{

})

module.exports = router;