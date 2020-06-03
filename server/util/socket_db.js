const mongoose = require("mongoose");
const Conversation = require("../models/conversation");

const saveMessageToConversation = ({message, conversationId}) => {
  const id = mongoose.Types.ObjectId(conversationId);
  Conversation.update({_id: id}, {
                      $push: {
                        messages: message
                      }
                    }, function(err, chat) {
                      if (err) return console.error('Could not save post', err);
                      if (chat) console.log('Conversation was updated', chat);
                    })
}

module.exports = {saveMessageToConversation};