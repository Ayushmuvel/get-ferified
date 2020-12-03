const {login_check,home}  = require('../services/log_in')
const smart_con = require('../services/smart_con')
// const {account_key} = require('../../config/sys_vari')
const deAC_acc =require('../module/de_acc')
const ind_id = require('../module/Ind')

exports.login_data = async function (req,res,next) {

    email = req.body.Email
    password = req.body.password

    login_check(email,password,(err,id,type)=>{
        if (err){
            res.send(err)
        }else{
            // console.log(id)
            req.session.userId = id
            if (type == 1){
                res.redirect('/home/home')  
            }else{
                res.redirect('/home/office')
            }
           
        }
    })

}

exports.log_out = function(req,res,next){
    req.session.destroy(err=>{
        if (err){
            //console.log(err)
            return res.redirect('/home/login')
        }
        res.clearCookie('sid')
        res.redirect("/home/login")
    })
}

exports.log_home =  async function (req,res,next) {
    id = req.session.userId
    home(id,(err,responce)=>{
        if (err){
            res.send(err)
        }else{
            //console.log(responce)
            req.session.status = responce.Activated
            req.session.userAddress = responce.userAddress
            responce.Activate?status = 'active':status = 'deactive'
            kyc = responce.kycId
            res.render('v1/public/home.ejs',
            {
                account:responce.userAddress,
                status:status,
                kyc:kyc,
                eduQuaification : responce.eduQuaification,
                workExp : responce.workExp,
                certficate : responce.certficate,
                project : responce.project,
                skill : responce.skill,
            })
        }
    })
}

exports.log_office = function (req,res,next){
    id = req.session.userId
    smart_con.off_List(id,(responce)=>{
        req.session.userAddress = responce.userAddress
        let address = responce.userAddress
        let ver_type = responce.ver_type
        let state = responce.Activate
        let type
        switch (ver_type) {
            case '2':
                type = 'Organization'
                break;
            case '3':
                type ='Education Institute'
                break;
            case '4':
                type = 'Verifier'
                break;
            default:
                break;
        }
        state?status = 'active':status = 'deactive'
        res.render('v1/public/office.ejs',{address:address,ver_type:type,state:status})

    })
}

exports.dea_acc = async function (req,res,next){
    var id = req.session.userId
    // console.log(req)
    account_key = req.query.account_priv_key_5
    // console.log(account_key)
    let email
    await ind_id.findById(id,(err,responce)=>{
        if(err)
        {
            res.end(err)
        }else{
            email = responce.Email
            
            let newContacts = new deAC_acc ({
                acc_no : id,
                email : email,
            });
            
            newContacts.save(async(err,item)=>{
                if(err){
                    res.json({msg:"failed to add contact " + err})
                }
                else{
                    await smart_con.can_doc_fun('non',id,0,4,req.session.userAddress,account_key,(err,recipt)=>{
                        if (err){
                            res.send(err)
                        }else{
                            res.render('v1/public/pay.ejs',{price:recipt.gasUsed})  
                        }
                      })
                }
            });
        }
    })

}
