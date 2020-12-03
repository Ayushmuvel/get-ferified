const de_ac_lis = require ('../module/de_acc')
const cer_list = require('../module/cer_list')

exports.app_list = function(req,res,next){
    cer_list.find((err,item)=>{
        // console.log(item)
        if (err){
            res.send(err)
        }else{
            res.render('v1/public/cer_list_ac.ejs',{items:item})
        }
    })
}

exports.deAc_lis = function (req,res,next){
    de_ac_lis.find((err,item)=>{
        if (err){
            res.send(err)
        }else{
            res.render('v1/public/de_ac_ac_list.ejs',{items:item})
        }
    })
}

exports.check_cer = async function (req,res,next){
    _id = req.body._id
    let type
    let id
    await cer_list.findById(_id,(err,responce)=>{
        if (!err){
            id = responce.cer_id
            type = responce._type
        }
        else{res.send(err)}
    })

    switch (type) {
        case 1:
            res.redirect('/cer/edu/display?fin_id='+id)
            break;
        case 2:
            res.redirect('/cer/work/dipslay?fin_id='+id)
            break;
        case 3:
            res.redirect('/cer/org_cer/dipslay?fin_id='+id)
            break;
        default:
            break;
    }
}