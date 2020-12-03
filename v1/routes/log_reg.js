const express = require("express");
const router = express.Router();
const {login_data,log_out} = require('../controllers/log_reg')
const {register_in,com_regis} = require('../services/register')
var dea_acc = require('../controllers/log_reg')

router.get('/login',(req,res)=>{
    res.send(`
        <body>
        <form method = "post" action = '/log_reg/login' >
            <input type = 'text' name ='Email' placeholder = "Email" required />
            <input type = 'text' name ='password' placeholder = "password" required />
            <button type = 'submit'> login </button>
        </form>
        <a href = '/log_reg/register'>registration</a>
        </body>
    `)
})

router.post('/login',login_data,(req,res,next)=>{

})

router.get('/register',(req,res)=>{
    res.send(`<body>
            <form method = "post" action = '/log_reg/register' >
                <input type = 'text' name ='first_name' placeholder = "first_name" required />
                <input type = 'text' name ='middle_name' placeholder = "middle_name"/>
                <input type = 'text' name ='last_name' placeholder = "last_name"/>
                <input type = 'text' name ='Email' placeholder = "Email"/>
                <input type = 'text' name ='password' placeholder = "password"/>
                <input type = 'text' name ='userType' placeholder = "userType"/>
                <button type = 'submit'> login </button>
            </form>
            <a href = '/log_reg/login'>logIn</a>
            </body>
            `)
})

router.post('/register',register_in,(req,res)=>{

})

router.get('/log_reg/complet_regis',(req,res)=>{
    res.render('v1/public/last_step.ejs')
})

router.post('/complet_regis',com_regis,(req,res)=>{
    // console.log(req.body)
})

router.get('/de_acc',dea_acc.dea_acc,(req,res,next)=>{

})

router.get("/LogOut",(req,res,next)=>{
    req.session.destroy(err=>{
        if (err){
            return res.redirect('/home/home')
        }
        res.clearCookie('sid')
        res.redirect("/home/home")
    })
})

router.post('/pay',(req,res)=>{
    // console.log(req.body.data)
})

module.exports = router;