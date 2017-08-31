var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    name: String,
    user_id: String,
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Image', ImageSchema);