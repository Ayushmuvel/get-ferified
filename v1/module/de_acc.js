const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    acc_no : {
        type:String,
        required:true,
    },
    email :  {
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('deac_acc',ContactSchema,);