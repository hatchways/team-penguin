var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    users: {
        type: [String],
        required: true
    },
    messages: [String],
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema, 'conversations');