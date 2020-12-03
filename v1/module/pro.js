const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    Proj_Name:{
        type:String,
        required:true,
    },
    company_name:{
        type:String,
        required:true,
    },
    Pro_disc:{
        type:String,
        required:true,
    },
    Start_date:{
        type:Date,
        required:true,
    },
    End_Date:{
        type:Date,
        required:false,      
    },
});

module.exports = mongoose.model('Pro_cer',ContactSchema,);