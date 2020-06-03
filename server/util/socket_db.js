const mongoose = require("mongoose");
const Conversation = require("../models/conversation");

const saveMessageToConversation = ({message, conversationId}) => {
  Conversation.update({_id: conversationId}, {
                      $push: {
                        grades: newGrade
                      }
                    }, function(err, chat) {
                      if (err) return console.error('Could not save post', err);
                      if (chat) console.log('Conversation was updated', chat);
                    })
}

module.exports = {saveMessageToConversation};