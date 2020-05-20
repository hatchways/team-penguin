var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* the updated_on date should be included whenever 
    a message gets added to a conversation so display 
    sort order can be latest to oldest
*/
var conversationSchema = new Schema({
    users: {
        type: [mongoose.Types.ObjectId],
        ref: 'users',
        required: true
    },
    messages: [{
        author_id: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        body: String,
        language: String,
        img_url: String,
        created_on: { type: Date, default: Date.now }
    }],
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema, 'conversations');