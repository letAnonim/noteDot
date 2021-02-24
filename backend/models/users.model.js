const mongoose = require('mongoose');

const Users = mongoose.Schema({
    name:{type:String, required: true},
    age:{type:Number, required: true},
    password:{type:String, required: true},
    photo:{
        name: String,
        desc: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Users', Users);
