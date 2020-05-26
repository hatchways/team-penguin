var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invitationSchema = new Schema({
    rejected: Boolean,
    approved: {
        type: Boolean,
        default: false
    },
    from_user_email: {
        type: String,
        required: true
    },
    to_user_email: {
        type: String,
        required: true
    },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invitation', invitationSchema, 'invitations');