const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    letter:{
        type:String,
        required:true,
    },
    company_name:{
        type:String,
        required:true,
    },
    Issue_Date:{
        type:String,
        required:true,
    },
    Issue_By:{
        type:String,
        required:true,
    },
    imag_letter:{
        data: Buffer, 
		contentType: String       
    },
});

module.exports = mongoose.model('work_exp',ContactSchema,);