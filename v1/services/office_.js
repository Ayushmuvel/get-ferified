const de_ac_list = require('../module/de_acc')
const smart_con = require('./smart_con')
const ind = require('../module/Ind')
const cer_ap_list = require('../module/cer_list')
var {account_key} = require('../../config/sys_vari')

exports.ac_de_ac = async function(req,res,next){
    id = req.body.acc_no
    let in_id
    let type
    var user_id = req.session.userId
    var account = req.session.userAddress
    await de_ac_list.findById(id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            in_id = responce.acc_no
        }
    })
    await ind.findById(in_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            type = responce.userType
        }
    })
    de_ac_list.findByIdAndDelete(id,async(err,responce)=>{
        // console.log(res)
        if (err){
            res.send(err)
        }else{
            await smart_con.off_doc_fun(in_id,user_id,type,3,account,account_key,(err,recipt)=>{
                res.redirect('/home/office')
            })
        }
    })
}

exports.deAc_ac = async function (req,res,next){
    var user_id = req.session.userId
    var account = req.session.userAddress
    let email
    
    await ind.findById(user_id,(err,responce)=>{
        if (err){
            res.send(err)
        }else{
            email = responce.Email
        }
        
    })

    let newContacts = new de_ac_list ({
        acc_no : user_id,
        email : email,
    });

    newContacts.save(async(err,item)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            await smart_con.off_doc_fun(user_id,user_id,0,2,account,account_key,(err,recipt)=>{
                res.redirect('/home/office')
            })
        }
    });
}

exports.app_cer_check = async function (req,res,next){
    let id 
    let _id
    var user_id = req.session.userId
    var account = req.session.userAddress
    let state 
    if (req.body.app){
        state = 1
        id = req.body.app
    }
    if(req.body.rej){
        state = 2
        id = req.body.rej
    }
    await cer_ap_list.findById(id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            _id = responce.cer_id
        }
    })
    await smart_con.off_doc_fun(_id,user_id,state,1,account,account_key,(err,responce_1)=>{
        cer_ap_list.findByIdAndDelete(id,(err,responce)=>{
            if(err){
                res.send(err)
            }  else{
                res.redirect('/home/office')
            }
        })
    })
}