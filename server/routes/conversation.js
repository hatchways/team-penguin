const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Conversation = require("../models/conversation");
const User = require("../models/user");
const router = express.Router();
const {areArraysEqual} = require("../util");

//TODO post new conversation (given list of users) returning id
router.post("/user/:email",
  passport.authenticate('jwt', {session: false}),
  function(req, res, next) {
    const {email} = req.params;
    const {contactsAr} = req.body; //make this as array
    let conversationUsers = [email];
    conversationUsers = conversationUsers.concat(contactsAr);
    //verify conversation between group does not exist already, if it does, return that _id
    Conversation.find({ 
      $and: [{
        user_emails: { $all: conversationUsers }
      }, {
        user_emails: { $size: conversationUsers.length}
      }]
    }, function(err, conversations) {
      if (err) console.error(err);
      if (conversations && conversations.length) {
        //do a deep equals match
        for (let i = 0; i < conversations.length; 
        }
      } else {

      }
    })
    //else create converation, returning _id
  }
);

/* on successful return, json includes this object, dictUidToObj
    {uid_as_string: {email, language}}
    as well as the conversations
*/
router.get("/user/:id",
    passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {id} = req.params;
        let objId = mongoose.Types.ObjectId;
        Conversation.find({users:{ "$in" : [new objId(id)]} })
            .sort({updated_on: -1})
            .exec(function(err, conversations) {
                if (err) {
                    return handleError(err);
                }
                if (conversations && conversations.length) {
                    let dictUidToObj = {};
                    conversations.forEach((conversation, idx) => {
                        conversation.users.forEach((uid, idx2) => {
                            let innerIdx = idx2;
                            if (!dictUidToObj[uid.toString()]) {
                                User.findById(uid.toString(), function(err, user) {
                                    if (err) {
                                        return handleError(err)
                                    }
                                    if (user) {
                                        let userObj = {};
                                        userObj.email = user.email;
                                        userObj.language = user.language;
                                        dictUidToObj[uid.toString()] = userObj;
                                        if (idx === conversations.length - 1 && innerIdx === conversation.users.length - 1) {
                                            res.json({ type: "success", conversations, dictUidToObj})
                                        }                
                                    }
                                })
                            }
                        })
                    })
                } else {
                    res.json({ type: "success", message: "There are no current conversations"})
                }
            }
        )
    }
);

module.exports = router;