const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    Skill_type:{
        type:String,
        required:true,
    },
    Skill_name:{
        type:String,
        required:true,
    },
    certificate_link:{
        type:String,
        required:false,
    }
});

module.exports = mongoose.model('Certificates',ContactSchema,);