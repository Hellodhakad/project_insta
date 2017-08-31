var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    comment_data: String,
    user_id: String,
    image_id: String,
    username: String,
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', ImageSchema);