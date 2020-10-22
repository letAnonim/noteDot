const mongoose = require('mongoose');

const Messages = mongoose.Schema({
    text:{type:String, required: true},
    author:{type:String, required: true},
    port:{type:String, required: true}
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Messages', Messages);