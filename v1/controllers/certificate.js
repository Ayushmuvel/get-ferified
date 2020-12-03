const edu_cer = require('../module/Edu_cer')
const WorkEXP = require('../module/work_exp')
const Certificate = require('../module/cer')
const project = require('../module/pro')
const skill = require('../module/skill')
const KYC = require('../module/kyc')

const smart_con = require('../services/smart_con')

// display education certificates 
exports.edu_disp = function(req,res,next){
    let _id = req.query.fin_id
    edu_cer.findById(_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            smart_con.read_doc(_id,status=>{
                let active_status 
                switch (status.state) {
                    case '0':
                        active_status = 'updating'
                        break;
                    case '1':
                        active_status = 'submitted and waiting for approval'
                        break;
                    case '2':
                        active_status = 'approved'
                        break;
                    case '3':
                        active_status = 'rejected'
                        break;
                    default:
                        active_status = 'undefined'
                        break;
                }
                res.render('v1/public/edu_cer_dip.ejs',{image:responce,status:active_status,app_data:status})
            })
        }
    })
}

// display work experience certificate
exports.work_exp_disp = function(req,res,next){
    let _id = req.query.fin_id
    WorkEXP.findById(_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            smart_con.read_doc(_id,status=>{
                let active_status 
                switch (status.state) {
                    case '0':
                        active_status = 'updating'
                        break;
                    case '1':
                        active_status = 'submitted and waiting for approval'
                        break;
                    case '2':
                        active_status = 'approved'
                        break;
                    case '3':
                        active_status = 'rejected'
                        break;
                    default:
                        active_status = 'undefined'
                        break;
                }
                res.render('v1/public/work_exp_disp.ejs',{image:responce,status:active_status,app_data:status})
            })
        }
    })
}

// display orgination certificates
exports.org_cer_disp = function(req,res,next){
    let _id = req.query.fin_id
    Certificate.findById(_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            smart_con.read_doc(_id,status=>{
                let active_status 
                switch (status.state) {
                    case '0':
                        active_status = 'updating'
                        break;
                    case '1':
                        active_status = 'submitted and waiting for approval'
                        break;
                    case '2':
                        active_status = 'approved'
                        break;
                    case '3':
                        active_status = 'rejected'
                        break;
                    default:
                        active_status = 'undefined'
                        break;
                }
                res.render('v1/public/org_cer_disp.ejs',{image:responce,status:active_status,app_data:status})
            })
        }
    })
}

// display projects 
exports.proj_disp = function(req,res,next){
    let _id = req.query.fin_id
    project.findById(_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            
            res.render('v1/public/pro_cer_disp.ejs',{image:responce})
            
        }
    })
}

// display skills
exports.skill_disp = function(req,res,next){
    let _id = req.query.fin_id
    skill.findById(_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            
            res.render('v1/public/skill_disp.ejs',{image:responce})
            
        }
    })
}

// display kyc data
exports.KYC_disp = function(req,res,next){
    let _id = req.query.fin_id
    KYC.findById(_id,(err,responce)=>{
        if(err){
            res.send(err)
        }else{
            res.render('v1/public/kyc_disp.ejs',{image:responce}) 
        }
    })
}