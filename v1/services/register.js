const ind_sc = require('../module/Ind')
const smat_con = require('./smart_con')
// const {account_add,account_key} = require('../../config/sys_vari')
const Web3 = require('web3');

exports.register_in = async function(req,res,next){
    
    let newContacts = new ind_sc({
        firstName :req.body.first_name,
        middleNmae:req.body.middle_name,
        lastName :req.body.last_name ,
        Email : req.body.Email,
        userType: req.body.userType,
    });

    newContacts.setPassword(req.body.password)
    
    newContacts.save(async (err,contact)=>{
        if(err){
            // console.log(err) 
            res.redirect("/log_reg/register")
        }
        else{
            //etherium account creation
            await smat_con.create_acc()
            res.render('v1/public/get_fun.ejs',{userId:String(contact._id),account_num:account_add,account_priv_key:account_key,account_bal:account_bal})    
        }
    });
}

exports.com_regis = async (req,res,next) =>{

    userId = req.body.userId

    await ind_sc.findById(userId,(err,responce)=>{
        userType = responce.userType
    })

    account_add = req.body.account_num
    account_key = req.body.account_priv_key

    console.log(userId,userType,account_add,account_key)

    await smat_con.add_user(userId,userType,account_add,account_key,(err,abi)=>{
        if (err){
            // console.log(err)
        }else{
            //console.log(abi)
            res.render('v1/public/pay.ejs',{price : abi.gasUsed})
        }
    })

}