const mongoose = require('mongoose');
    
const ImageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', ImageSchema);
