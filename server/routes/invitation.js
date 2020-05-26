const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const validator = require("validator");
const Invitation = require("../models/invitation");
const User = require("../models/user");
//const {sendEmail, sendEmailMultiple} = require("../util/sendgrid_helpers")
const router = express.Router();

router.post("/user",
    //passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {toEmailAr, fromEmail, referralId} = req.body;
        // let invalidEmails = [];
        // let validEmails = [];
        // let curUserEmails = [];
        // let nonCurUserEmails = [];

//test with one recipient
    //recipient is cur user (trigger invitation creation)

        //no validation, one touser existing user
        //if (toEmailAr.length === 1) {
            User.findOne({email: toEmailAr[0]})
                .then(user => {
                    if (user) {
                        const invite = new Invitation({
                                        "from_user_email": fromEmail,
                                        "to_user_email": toEmailAr[0]
                                    });
                        invite.save(function(err) {
                            if (err) return handleError(err);
                            res.json({ type: "success", message: "The invitation was saved."});
                        });
                    } else {
                        console.log('send email')
                    }
                })
                .catch(err => console.error('find user err', err))
        //}
    }
);



// Returns pending invitations that were sent to the given user
router.get("/user/:id",
    passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {id} = req.params;
        var objId = mongoose.Types.ObjectId;

        Invitation.find({"to_user": new objId(id), "approved": false, "rejected": {$ne: true}})
            .sort({createdOn: 1})
            .exec(function (err, invitations) {
                if (err) {
                    return handleError(err);
                }
                if (invitations && invitations.length) {
                    res.json({ type: "success", invitations})
                } else {
                    res.json({ type: "success", message: "There are no pending invitations"})
                }
            }
        )
    }
);

// Returns contacts that the current user accepted invitations from
router.get("/user/:id/contacts",
    passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {id} = req.params;
        var objId = mongoose.Types.ObjectId;

        Invitation.aggregate([
            { $match: {"to_user": new objId(id), "approved": true } },
            { $lookup: {
                from: "users",
                localField: "from_user",
                foreignField: "_id",
                as: "user_data"
                } 
        }])
            .exec(function (err, invitations) {
                if (err) {
                    return handleError(err);
                } 
                if (invitations && invitations.length) {
                    let contacts = invitations.map(invite => { return invite.user_data[0]})
                    res.json({ type: "success", contacts})
                }
            })
    }
);

module.exports = router;