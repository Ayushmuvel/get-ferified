const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    course:{
        type:String,
        required:true,
    },
    university:{
        type:String,
        required:true,
    },
    collage:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:true,
    },
    Marks:{
        type:Number,
        required:true,
    },
    CGPA:{
        type:Number,
        required:true,
    },
    certificateLink:{
        data: Buffer, 
		contentType: String
    },

});

module.exports = mongoose.model('EDU_Certificates',ContactSchema,);