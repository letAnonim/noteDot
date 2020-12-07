const mongoose = require('mongoose');

const Notes = mongoose.Schema({
    title:{type:String, required: true},
    color:{type:String, required: true},
    owner:{type: String, require: true},
    text:{type:String},
    connectedUsers:{type: Array}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Notes', Notes);
