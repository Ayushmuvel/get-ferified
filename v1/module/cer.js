const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    certificate : {
        type:String,
        required:true
    },
    Orginization_name:{
        type:String,
        required:true
    },
    Issue_date:{
        type:Date,
        required:true,
    },
    Issue_By:{
        type:String,
        required:true
    },
    cer_img:{
        data: Buffer, 
		contentType: String  
    },
});

module.exports = mongoose.model('Org_Certificates',ContactSchema,);