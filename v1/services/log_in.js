const ind_sc = require('../module/Ind')
const smart_con = require('./smart_con')

exports.login_check = async function(email,password,result){
    await ind_sc.find(async(err,users)=>{
        //console.log(users) 
        if (! err){
            var user
            if (email && password){
                user = users.find(user => user.Email === email)
                //console.log(user)
            }
            if (user){
                if (user.validPassword(password)){
                    id = String(user._id)
                    type = user.userType
                    result(null,id,type)
                }else{
                    result("wrong password",0,'err')
                }
            }
            else{
                // console.log('log in not found')
                result('log in not found',0,'err')
            }
        }
        else{
            result('data base error : '+ err,0,'err')
            // console.log('data base error : '+ err)
        }
    })
    
}

exports.home = async function (id,detail){
    await smart_con.get_detail(id,(res)=>{
        // console.log(res)
        detail(null,res)
        
    })
}
