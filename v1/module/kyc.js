const mongoose = require("mongoose");
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
    DOB :{
        type:Date,
        required:true
    },
    Country : {
        type:String,
        required:true
    },
    State :{
        type:String,
        required:true
    },
    City :{
        type:String,
        required:true
    },
    Pri_Address:{
        type:String,
        required:true
    },
    Seco_Address:{
        type:String,
        required:false
    },
    Email:{
        type:String,
        required:true
    },
    Pri_Contact:{
        type:Number,
        required:true
    },
    Alt_Contact:{
        type:Number,
        required:false,
    },
    Emer_Contact:{
        type:Number,
        required:true
    },
    ID_proof:{ 
		data: Buffer, 
		contentType: String 
	} ,
    Address_Proof:{ 
		data: Buffer, 
		contentType: String 
	} 
});

module.exports = mongoose.model('KYC',ContactSchema,);