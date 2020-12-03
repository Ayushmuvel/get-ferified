// importing modules   "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="D:\Files\MongoDB\DATA\db"

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const {conn_port} = require('./config/sys_vari')
const login_Check = require('./v1/services/login_check')
const connectDB = require('./config/mongo_con') //connect to mongoes DB
connectDB()

const smart_con = require('./v1/services/smart_con')//load smart contract
smart_con.Dep()

//adding express 
var app = express();

// calling API files
var log_reg = require('./v1/routes/log_reg')
var home = require('./v1/routes/home_')
var kyc = require('./v1/routes/kyc_up')
var certificate = require('./v1/routes/certificate')
var office = require('./v1/routes/office_')

//adding middle wear - cors
app.use(cors());

//adding middle wear - session 
app.use(session({
    name :'sid',
    resave:false,
    secret:'se!@#sson#@!',
    saveUninitialized:false,
    cookie:{
        maxAge : 1000*60*60*2, // 2 hour session time
        path : "/",
        sameSite : true,
        secure : false, //true for production 
    }
}))

//body parsera
app.use(bodyParser.json());

// Set EJS as templating engine  
app.set("view engine", "ejs");

//static files
app.use(express.static(path.join(__dirname,'./v1/public')));
//app.use(bodyParser.urlencoded({extend:true}));
app.use(express.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

// redirecting routes 
app.use('/log_reg',log_reg) // log in and register route
app.use('/home',login_Check.redirectLogin,home) // home route
app.use('/KYC',login_Check.redirectLogin,kyc) // kyc upload
app.use('/cer',login_Check.redirectLogin,certificate) // add different cerfificate
app.use('/off',office) // officeal use only

// end point 
app.get('/',(req,res)=>{
    res.send('it work')
})

// defining port to listen
app.listen(conn_port,()=>{
    console.log("server started at port "+ conn_port);
})