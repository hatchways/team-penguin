const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const validator = require("validator");
const Invitation = require("../models/invitation");
const router = express.Router();

router.post("/user/:email",
    passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {email} = req.params;
        const {emailAr, fromEmail} = req.body;
        let invalidEmails = [];
        let validEmails = [];
        let curUserEmails = [];
        let nonCurUserEmails = [];

//test with one recipient
//test with multiple recipients (mix of existing users, nonexisting users)

/*
email validation
    no empty arr
    valid email values
list of valid emails
list of invalid emails
*/
        if (emailAr.length === 0) {
            return res.status(400).json({error: 'No email addresses for invitation recipients were provided.'})
        }
        emailAr.forEach(email => {
            if (validator.isEmail(email)) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        })

/*
get list of recipients who are already users
make list of recipients who are not users
*/
        if (!validEmails.length) {
            return res.status(400).json({error: 'Email addresses for invitation recipients were invalid. Please check the spelling.'})
        } else {

//query for existing users (TODO)
    //sendgrid for non existing users

    //create invites for existing users
            let newInvites = [];
            validEmails.forEach(to_user_email => {
                let newInvite = {to_user_email, from_user_email: fromEmail};
                newInvites.push(newInvite);
            });
            Invitation.insertMany(newInvites, function(err, invitations) {
                if (err) console.error(err);

            })

        }

/*
create invitations for recipients who are users
    then trigger sendgrid requests for recipients who are not users
*/





        const invite = new Invitation({
            "from_user_email": email,
            "to_user": new objId(to_user_id),
            to_user_email
        });
        invite.save(function(err) {
            if (err) return handleError(err);
            res.json({ type: "success", message: "The invitation was saved."});
        });
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