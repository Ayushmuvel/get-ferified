const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);

const ContactSchema = mongoose.Schema({
    cer_id : {
        type:String,
        required:true,
    },
    _type : {
        type :Number,
        required:true,
    },
});

module.exports = mongoose.model('app_cer_id',ContactSchema,);