const express = require("express");
const router = express.Router();

var {KYC_disp} = require('../controllers/certificate')
var {add_kyc} = require('../services/kyc')

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


router.get("/set",(req,res,next)=>{
    res.send(`<body>
            <form  action='/KYC/set' method="POST" enctype="multipart/form-data" >
                <input type = 'text' name ='first_Name' placeholder = "first_Name" required />
                <input type = 'text' name ='middle_Name' placeholder = "middle_Name" >
                <input type = 'text' name ='last_Name' placeholder = "last_Name" required />
                <input type = 'date' name ='Date_OB' placeholder = "Date_OB" required />
                <input type = 'text' name ='country' placeholder = "country" required />
                <input type = 'text' name ='state' placeholder = "state" required />
                <input type = 'text' name ='city' placeholder = "city" required />
                <input type = 'text' name ='primary_addr' placeholder = "primary_addr" required />
                <input type = 'text' name ='sec_addr' placeholder = "sec_addr" required />
                <input type = 'text' name ='Email' placeholder = "Email" required />
                <input type = 'text' name ='pri_cont' placeholder = "pri_cont" required />
                <input type = 'text' name ='sec_cont' placeholder = "sec_cont" required />
                <input type = 'text' name ='emer_cont' placeholder = "emer_cont" required />
                <input type="file" id="image" name="image" value="" required  />
                <input type="file" id="image" name="image" value="" required />
                <button type = 'submit'> save </button>
            </form>
            <a href = '/home/home'>registration</a>
            </body>
            `)
})

router.post('/set',upload.array('image',2),add_kyc,(req,res,next)=>{
    
})

router.get('/display',KYC_disp,(req,res,next)=>{

})

module.exports = router;