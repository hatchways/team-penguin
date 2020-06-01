const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const validator = require("validator");
const Invitation = require("../models/invitation");
const User = require("../models/user");
const {sendEmail, getSuccessCount} = require("../util/sendgrid_helpers")
const router = express.Router();

router.post("/user/:fromEmail",
    //passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {toEmailAr, referralId} = req.body;
        const {fromEmail} = req.params;
        let invalidEmails = [];
        let validEmails = [];
        let curUserEmails = [];
        let dupeInviteRecipients = [];
        let nonDupeInviteRecipients = [];
        let nonCurUserEmails = [];
        let inviteRecipients = [];
        let inviteCreatedInternalMessage = '';
        let inviteCreatedEmailMessage = '';
        let inviteNotCreatedEmailMessage = '';

        if (toEmailAr.length === 0) {
          return res.status(400).json({error: 'No email addresses for invitation recipients were provided.'})
        }
        toEmailAr.forEach(email => {
            if (validator.isEmail(email)) {
                validEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        });
        if (!validEmails.length) {
            return res.status(400).json({error: 'Email addresses for invitation recipients were invalid. Please check the spelling.'})
        } else {
            validEmails.forEach((to_email, idx) => {
                User.find({email: to_email}, function(err, user) {
                    if (err) console.error('unable to find user', err);
                    if (!user.length) {
                        nonCurUserEmails.push(to_email);
                    }
                    if (user.length) {
                        curUserEmails.push(to_email);
                    }
                    if (idx === validEmails.length - 1) {
                      //1 handle case where recipients include registered users and non registered
                        if (curUserEmails.length && nonCurUserEmails.length) {
                          //verify requested invite does not exist
                          Invitation.find({from_user_email: fromEmail}, 'to_user_email', function(err, invitations) {
                            if (err) console.error('Could not find invitations during duplicate invites check', err);
                            //line 54 missing closing brace
                            if (invitations && invitations.length) {
                              invitations.forEach(invite => {
                                if (dupeInviteRecipients.indexOf(invite.to_user_email) === -1 && curUserEmails.indexOf(invite.to_user_email) > -1) {
                                  dupeInviteRecipients.push(invite.to_user_email);
                                }
                              });
                              nonDupeInviteRecipients = curUserEmails.filter(email =>   dupeInviteRecipients.indexOf(email) === -1);
                              if (nonDupeInviteRecipients.length) {
                                let newInvites = nonDupeInviteRecipients.map(to_user_email => {return {to_user_email, from_user_email: fromEmail}});
                                Invitation.insertMany(newInvites, function(err) {
                                  if (err) return console.error(err);
                                  inviteRecipients = inviteRecipients.concat(nonDupeInviteRecipients);
                                  if (nonCurUserEmails.length) {
                                    sendEmail({from_email: fromEmail, 
                                                to_email_ar: nonCurUserEmails, 
                                                referral_id: referralId})
                                      .then(resp => {
                                        if (getSuccessCount(resp) === nonCurUserEmails.length) {
                                          inviteRecipients = inviteRecipients.concat(nonCurUserEmails);
                                          inviteNotCreatedEmailMessage = dupeInviteRecipients.length ? `. Invitations were not sent to ${dupeInviteRecipients.join(', ')} because the invitation was already sent, pending, or rejected.`: '';
                                          inviteCreatedEmailMessage = `Invitations were sent to ${inviteRecipients.join(', ')}`;
                                          res.json({ type: "success", message: `${inviteCreatedEmailMessage}${inviteNotCreatedEmailMessage}`});
                                        }
                                      })
                                      .catch(err => {
                                          console.error('sendgrid email err', err);
                                      })
                                  }
                                })
                              } else {
                                //all registered invite recipients already received invites earlier
                                if (nonCurUserEmails.length) {
                                  sendEmail({from_email: fromEmail, 
                                              to_email_ar: nonCurUserEmails, 
                                              referral_id: referralId})
                                    .then(resp => {
                                      if (getSuccessCount(resp) === nonCurUserEmails.length) {
                                        inviteRecipients = inviteRecipients.concat(nonCurUserEmails);
                                        inviteNotCreatedEmailMessage = `Invitations were not sent to ${dupeInviteRecipients.join(', ')} because the invitation was already sent, pending, or rejected.`;
                                        inviteCreatedEmailMessage = `Invitations were sent to ${inviteRecipients.join(', ')}`;
                                        res.json({ type: "success", message: `${inviteCreatedEmailMessage}. ${inviteNotCreatedEmailMessage}`});
                                      }
                                    })
                                    .catch(err => {
                                        console.error('sendgrid email err', err)
                                    })
                                }
                              }
                            }
                          })
                        } else if (curUserEmails.length) {
                          //verify that requested email does not exist
                          Invitation.find({from_user_email: fromEmail}, 'to_user_email', function(err, invitations) {
                            if (err) console.error('Could not find invitations during duplicate invites check', err);
                            if (invitations && invitations.length) {
                              invitations.forEach(invite => {
                                if (dupeInviteRecipients.indexOf(invite.to_user_email) === -1 && curUserEmails.indexOf(invite.to_user_email) > -1) {
                                  dupeInviteRecipients.push(invite.to_user_email);
                                }
                              });
                              nonDupeInviteRecipients = curUserEmails.filter(email =>   dupeInviteRecipients.indexOf(email) === -1);
                              if (nonDupeInviteRecipients.length) {
                                let newInvites = nonDupeInviteRecipients.map(to_user_email => {
                                  return {to_user_email, from_user_email: fromEmail}});
                                Invitation.insertMany(newInvites, function(err) {
                                  if (err) return console.error(err);
                                  inviteCreatedInternalMessage =  `Internal invitations were sent to ${nonDupeInviteRecipients.join(', ')}.`
                                  res.json({ type: "success", message: `${inviteCreatedInternalMessage}`});
                                })
                              } else {
                                inviteNotCreatedEmailMessage = `Invitations were not sent to ${dupeInviteRecipients.join(', ')} because the invitation was already sent, pending, or rejected.`;
                                res.status(200).json({ type: "error", message: inviteNotCreatedEmailMessage})
                              }
                            }
                          })
                        } else if (nonCurUserEmails.length) {
                          sendEmail({from_email: fromEmail,
                                    to_email_ar: nonCurUserEmails, 
                                    referral_id: referralId})
                            .then(resp => {
                              if (getSuccessCount(resp) === nonCurUserEmails.length) {
                                inviteCreatedEmailMessage = `Email invitations were sent to ${nonCurUserEmails.join(', ')}`;
                                res.json({ type: "success", message: `${inviteCreatedEmailMessage}`});
                              }
                            })
                            .catch(err => {
                              console.error('sendgrid email err', err)
                            })
                        }
                    }
                })
            })
        }
    }
);

// Returns pending invitations that were sent to the given user
router.get("/user/:id",
    //passport.authenticate('jwt', { session: false }),
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
router.get("/user/:to_email/contacts",
  //passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    const {to_email} = req.params;

    Invitation.find({
      $or: [
        {"to_user_email": to_email, "approved": true },
        {"from_user_email": to_email, "approved": true },
      ]
    }, function(err, invitations) {
      if (err) return console.error('Contacts could not be retrieved.', err);
      if (invitations && invitations.length) {
        console.log('invitations', invitations)
        let contacts = invitations.map(invite => {
          return invite.to_user_email === to_email ? invite.from_user_email: invite.to_user_email;
        });
        res.status(201).json({type: 'success', contacts});
      } else {
        res.status(201).json({type: 'success', message: 'No contacts were found.', contacts: []})
      }
    });
  }
);

module.exports = router;
