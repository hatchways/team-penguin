var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invitationSchema = new Schema({
    rejected: Boolean,
    approved: Boolean,
    from_user: {
      type: String,
      required: true
    },
    to_user: {
        type: String,
        required: true
    },
    to_user_email: {
        type: String,
        default: null
    },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invitation', invitationSchema, 'invitations');