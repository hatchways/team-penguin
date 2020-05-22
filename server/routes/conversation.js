const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Conversation = require("../models/conversation");
const User = require("../models/user");
const router = express.Router();

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