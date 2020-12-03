const edu_cer = require('../module/Edu_cer')
const WorkEXP = require('../module/work_exp')
const Certificate = require('../module/cer')
const project = require('../module/pro')
const skill = require('../module/skill')
const cer_list = require('../module/cer_list')
 
const {can_doc_fun} = require('./smart_con')
// const {account_key} = require('../../config/sys_vari')


// file upload systerm
var fs = require('fs');

exports.add_edu_cer = function(req,res,next){

    account_key = req.body.account_priv_key

    let newContacts = new edu_cer ({
        course : req.body.course,
        university : req.body.university,
        collage : req.body.collage,
        Title : req.body.Title,
        Marks : req.body.Marks,
        CGPA : req.body.cgpa,
        certificateLink : {
            data: fs.readFileSync('./v1/uploads/' + req.files[0].filename), 
            contentType: 'image/png'
        },

    });

    newContacts.save(async(err,item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{ 
            let con = new cer_list({
                cer_id : item._id,
                _type : 1,
            })
            await con.save((err,item_1)=>{
                // console.log(item_1)
            })
            await can_doc_fun(String(item._id),req.session.userId,1,1,req.session.userAddress,account_key,(err,recipt)=>{
                res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
              })
        }
    });
}

exports.add_work_exp = function(req,res,next){

    account_key = req.body.account_priv_key_1

    let newContacts = new WorkEXP ({
        letter : req.body.letter,
        company_name : req.body.company_name,
        Issue_Date : req.body.Issue_Date,
        Issue_By : req.body.Issue_By,
        imag_letter : {
            data: fs.readFileSync('./v1/uploads/' + req.files[0].filename), 
            contentType: 'image/png'
        },

    });

    newContacts.save(async(err,item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            let con = new cer_list({
                cer_id : item._id,
                _type : 2,
            })
            await con.save((err,item_1)=>{
                // console.log(item_1)
            })
            //add this id in block chain
            await can_doc_fun(String(item._id),req.session.userId,2,1,req.session.userAddress,account_key,(err,recipt)=>{
                res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
              })
        }
    });
}

exports.add_cer = function(req,res,nect){

    account_key = req.body.account_priv_key_2

    let newContacts = new Certificate ({
        certificate : req.body.certificate,
        Orginization_name : req.body.Orginization_name,
        Issue_By : req.body.Issue_By,
        Issue_date : req.body.Issue_date,
        cer_img : {
            data: fs.readFileSync('./v1/uploads/' + req.files[0].filename), 
            contentType: 'image/png'
        },

    });

    newContacts.save(async(err,item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            let con = new cer_list({
                cer_id : item._id,
                _type : 3,
            })
            await con.save((err,item_1)=>{
                // console.log(item_1)
            })
            //add this id in block chain
            await can_doc_fun(String(item._id),req.session.userId,3,1,req.session.userAddress,account_key,(err,recipt)=>{
                res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
              })
        }
    });
}

exports.add_proj = function(req,res,next){

    account_key = req.body.account_priv_key_3

    let newContacts = new project ({
        Proj_Name : req.body.Proj_Name,
        company_name : req.body.company_name,
        Pro_disc : req.body.Pro_disc,
        Start_date : req.body.Start_date,
        End_Date : req.body.End_Date,
        
    });

    newContacts.save(async(err,item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            //add this id in block chain
            await can_doc_fun(String(item._id),req.session.userId,4,1,req.session.userAddress,account_key,(err,recipt)=>{
                res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
            })
        }
    });
}

exports.add_skill = function (req,res,next){

    account_key = req.body.account_priv_key_4

    let newContacts = new skill ({
        Skill_type : req.body.Skill_type,
        Skill_name : req.body.Skill_name,
        certificate_link : req.body.certificate_link,
    });

    newContacts.save(async(err,item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            //add this id in block chain
            await can_doc_fun(String(item._id),req.session.userId,5,1,req.session.userAddress,account_key,(err,recipt)=>{
                res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
            })
        }
    });
}