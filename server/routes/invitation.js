const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const validator = require("validator");
const Invitation = require("../models/invitation");
const User = require("../models/user");
const {sendEmail, sendEmailMultiple} = require("../util/sendgrid_helpers")
const router = express.Router();

router.post("/",
    //passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {toEmailAr, fromEmail, referralId} = req.body;
        console.log('type toEmailAr', typeof toEmailAr)
        let invalidEmails = [];
        let validEmails = [];
        let curUserEmails = [];
        let nonCurUserEmails = [];
        let inviteCreatedInternalMessage = '';
        let inviteCreatedEmailMessage = '';

        /*
email validation
    no empty arr
    valid email values
list of valid emails
list of invalid emails
*/
        if (toEmailAr.length === 0) {
            return res.status(400).json({error: 'No email addresses for invitation recipients were provided.'})
        }
        toEmailAr.forEach(email => {
            if (validator.isEmail(email)) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        })
        if (!validEmails.length) {
            return res.status(400).json({error: 'Email addresses for invitation recipients were invalid. Please check the spelling.'})
        } else {
            validEmails.forEach((to_email, idx) => {
                User.find({email: to_email}, function(err, user) {
                    if (err) console.error('unable to find user', err);
                    if (!user.length) {
                        nonCurUserEmails.push(to_email);
                        console.log('nonCurUserEmails', nonCurUserEmails)
                    }
                    if (user.length) {
                        console.log('user', user)
                        curUserEmails.push(to_email);
                        
                    }
                    if (idx === validEmails.length - 1) {
                        //1 create invites for existing users
                        if (curUserEmails.length === 1) {
                            const invite = new Invitation({
                                "from_user_email": fromEmail,
                                "to_user_email": to_email
                            });
                            invite.save(function(err) {
                                if (err) return handleError(err);
//should I report issues
                                inviteCreatedInternalMessage = `An invitation was sent to ${to_email}.`
                                console.log('inviteCreatedInternalMessage', inviteCreatedInternalMessage)
                                //res.json({ type: "success", message: `An invitation was sent to ${to_email}.`});
                            });
                        } else if (curUserEmails.length > 1) {
                            let newInvites = [];
                            curUserEmails.forEach(to_user_email => {
                                let newInvite = {to_user_email, from_user_email: fromEmail};
                                newInvites.push(newInvite);
                            });
                            console.log('gets to last point')
//does this prevent sending via sendgrid
                            Invitation.insertMany(newInvites, function(err) {
                                if (err) return console.error(err);
                                inviteCreatedInternalMessage =  `Invitations were sent to ${curUserEmails.join(', ')}.`
                                console.log('inviteCreatedInternalMessage', inviteCreatedInternalMessage);
                                //res.json({ type: "success", message: `Invitations were sent to ${curUserEmails.join(', ')}.`});
                            })
                        }
                        //2 (slower) sendgrid for non existing users
                        if (nonCurUserEmails.length === 1) {
                            console.log('gets to sendgrid request 1')
                            sendEmail({from_email: fromEmail, 
                                        to_email: nonCurUserEmails[0], 
                                        referral_id: referralId})
                                .then(resp => console.log('sendgrid email sent', resp))
                                .catch(err => {
                                    console.error('sendgrid email err', err)
                                })
                        } //else if (nonCurUserEmails.length > 1) {
                        //     sendEmailMultiple({from_email: fromEmail,
                        //                 to_email_ar: nonCurUserEmails,
                        //                 referral_id: referralId})
                        //         .then(resp => console.log('sendgrid email group sent', resp))
                        //         .catch(err => console.error('sendgrid email err', err))
                        // }
                    }
                })
            })
        }


//test with one recipient
    //recipient is cur user (trigger invitation creation)

        //no validation, one touser existing user
        //if (toEmailAr.length === 1) {
            // User.findOne({email: toEmailAr[0]})
            //     .then(user => {
            //         if (user) {
            //             const invite = new Invitation({
            //                             "from_user_email": fromEmail,
            //                             "to_user_email": toEmailAr[0]
            //                         });
            //             invite.save(function(err) {
            //                 if (err) return handleError(err);
            //                 res.json({ type: "success", message: "The invitation was saved."});
            //             });
            //         } else {
            //             console.log('send email')
            //         }
            //     })
            //     .catch(err => console.error('find user err', err))
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