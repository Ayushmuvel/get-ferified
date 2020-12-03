exports.redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect("/log_reg/login")
    }else{
        next()
    }
}
exports.redirectHome = (req,res,next)=>{
    if(req.session.userId){
        res.redirect("/home/home")
    }else{
        next()
    }
}