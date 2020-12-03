const mongoose = require("mongoose");
var crypto = require('crypto');

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    firstName : {
        type:String,
        required:true
    },
    middleNmae:{
        type:String
    },
    lastName : {
        type:String,
        required:true
    },
    Email : {
        type:String,
        required:true,
        unique: true
    },
    hash : String, 
    salt : String,
    userType: {
        type:Number,
        required:true
    }
});

ContactSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex');
       // Hashing user's salt and password with 1000 iterations, 
       // 64 length and sha512 digest 
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 
     
ContactSchema.methods.validPassword = function(password) { 
       var hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, `sha512`).toString(`hex`); 
       return this.hash === hash; 
   }; 
     
// Exporting module to allow it to be imported in other files 
const User = module.exports = mongoose.model('Individual', ContactSchema); 

//module.exports = mongoose.model('Individual',ContactSchema);