var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    users: {
        type: [String],
        required: true
    },
    messages: [{
        author_id: {
            type: [String],
            required: true
        },
        body: String,
        language: String,
        img_url: String,
        created_on: { type: Date, default: Date.now }
    }],
    created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema, 'conversations');