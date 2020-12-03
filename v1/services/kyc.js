const kyc = require('../module/kyc')
// const {account_add,account_key} = require('../../config/sys_vari')
var {can_doc_fun} = require('../services/smart_con')
// file upload systerm
var fs = require('fs');

exports.add_kyc = async function(req,res,next) {

    account_key = req.body.account_priv_key_6

    var obj = {
        firstName : req.body.first_Name,
        middleNmae:req.body.middle_Name,
        lastName :req.body.last_Name,
        DOB :req.body.Date_OB,
        Country : req.body.country,
        State :req.body.state,
        City :req.body.city,
        Pri_Address:req.body.primary_addr,
        Seco_Address:req.body.sec_addr,
        Email:req.body.Email,
        Pri_Contact:req.body.pri_cont,
        Alt_Contact:req.body.sec_cont,
        Emer_Contact:req.body.emer_cont,
        ID_proof:{
            data: fs.readFileSync('./v1/uploads/' + req.files[0].filename), 
            contentType: 'image/png'
        },
        Address_Proof:{
            data: fs.readFileSync('./v1/uploads/' + req.files[1].filename), 
            contentType: 'image/png'
        }
    }; 

    kyc.create(obj,async(err, item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            //add this id in block chain
            await can_doc_fun(String(item._id),req.session.userId,0,3,req.session.userAddress,account_key,(err,recipt)=>{
              res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
            })
        }
    });
}