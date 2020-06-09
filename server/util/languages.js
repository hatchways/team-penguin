const mongoose = require("mongoose");
const User = require('../models/user');
const Conversation = require("../models/conversation");

//counting mandarin as simplified chinese
const language_codes = {
  'english': 'en',
  'spanish': 'es',
  'mandarin': 'zh-CN',
  'french': 'fr',
  'hindi': 'hi'
};

/*
  use this store as kind of memoization; when the user initiates a conversation, if the languages data is not stored yet, add it here bc want to avoid having to make a query on each message in the conversation and the user-language data is not getting passed in the contacts list currently
*/
//indexed by conversation_id
// let languages = {
//   '5ede9f01091edb1b37240a33': ['english', 'spanish'],
//   '5edeb8a0b4ff34257970e4d3':  ['english', 'spanish']
//}

const getEmailsByConversationId = (conversationId) => {
  return Conversation.find({_id: mongoose.Types.ObjectId(conversationId)}, 'user_emails', function(err, conversations) {
    if (err) console.error('Could not find conversation email addresses', err);
    if (conversations.length) {
      return conversations;
    }
  })
}

const getLanguagesByEmails = (emailAr) => {
  //let user_emails = conversations[0].user_emails;
  let languages = [];
  return Promise.all(emailAr.map(email => {
    return User.find({email}, 'language', function(err, users) {
      if (err) console.error('Could not get languages', err);
      if (users.length) {
        return users[0].language;
      }
    })
  }))
}

const getFriendLanguageCodes = (chatLanguages, originalLanguage) => {
  let translationLanguages = chatLanguages.filter(lang => lang !== originalLanguage);
  return translationLanguages.map(lang => language_codes[lang]);
}

module.exports = {language_codes, getFriendLanguageCodes, getEmailsByConversationId, getLanguagesByEmails};