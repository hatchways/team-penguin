const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const validator = require("validator");
const Invitation = require("../models/invitation");
const User = require("../models/user");
const {sendEmail, getSuccessCount} = require("../util/sendgrid_helpers")
const router = express.Router();
const invitationRejectApproveHelper = require('../controllers/invitationRejectApproveHelper');
const {getEmailSendSuccessMessage, getInviteSendSuccessMessage, getInviteNotSentMessage, getEmailSendMixedMessage} = require("../util");

//send an invite to user
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
                          let query = {};
                          let queryAr = [];
                          curUserEmails.forEach(toEmail => {
                            let queryObj1 = {};
                            let queryObj2 = {};
                            queryObj1.to_user_email = toEmail;
                            queryObj1.from_user_email = fromEmail;
                            queryAr.push(queryObj1);
                            queryObj2.to_user_email = fromEmail;
                            queryObj2.from_user_email = toEmail;
                            queryAr.push(queryObj2);
                          })
                          query['$or'] = queryAr;
                          Invitation.find(query, function(err, invitations) {
                            if (err) console.error('Could not find invitations during duplicate invites check', err);
                            if (invitations && invitations.length) {
                              invitations.forEach(invite => {
                                if (dupeInviteRecipients.indexOf(invite.to_user_email) === -1 &&curUserEmails.indexOf(invite.to_user_email) > -1) {
                                    dupeInviteRecipients.push(invite.to_user_email);
                                  }
                                if (invite.to_user_email === fromEmail &&
                                  dupeInviteRecipients.indexOf(invite.from_user_email) === -1 &&
                                  curUserEmails.indexOf(invite.from_user_email) > -1) {
                                    dupeInviteRecipients.push(invite.from_user_email);
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
                                          res.json({ type: "success", 
                                            message: getEmailSendMixedMessage(inviteRecipients, dupeInviteRecipients)
                                          });
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
                                        res.json({ type: "success", 
                                          message: getEmailSendMixedMessage(inviteRecipients, dupeInviteRecipients)
                                        });
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
                          //verify requested invite does not exist
                          let query = {};
                          let queryAr = [];
                          curUserEmails.forEach(toEmail => {
                            let queryObj1 = {};
                            let queryObj2 = {};
                            queryObj1.to_user_email = toEmail;
                            queryObj1.from_user_email = fromEmail;
                            queryAr.push(queryObj1);
                            queryObj2.to_user_email = fromEmail;
                            queryObj2.from_user_email = toEmail;
                            queryAr.push(queryObj2);
                          })
                          query['$or'] = queryAr;
                          Invitation.find(query, function(err, invitations) {
                            if (err) console.error('Could not find invitations during duplicate invites check', err);
                            if (invitations && invitations.length) {
                              invitations.forEach(invite => {
                                if (dupeInviteRecipients.indexOf(invite.to_user_email) === -1 &&curUserEmails.indexOf(invite.to_user_email) > -1) {
                                    dupeInviteRecipients.push(invite.to_user_email);
                                  }
                                if (invite.to_user_email === fromEmail &&
                                  dupeInviteRecipients.indexOf(invite.from_user_email) === -1 &&
                                  curUserEmails.indexOf(invite.from_user_email) > -1) {
                                    dupeInviteRecipients.push(invite.from_user_email);
                                  }
                              });
                              nonDupeInviteRecipients = curUserEmails.filter(email =>   dupeInviteRecipients.indexOf(email) === -1);
                              if (nonDupeInviteRecipients.length) {
                                let newInvites = nonDupeInviteRecipients.map(to_user_email => {
                                  return {to_user_email, from_user_email: fromEmail}});
                                Invitation.insertMany(newInvites, function(err) {
                                  if (err) return console.error(err);
                                  res.json({ type: "success",
                                    message: getInviteSendSuccessMessage(nonDupeInviteRecipients)});
                                })
                              } else {
                                res.status(200).json({ type: "error",
                                  message: getInviteNotSentMessage(dupeInviteRecipients)})
                              }
                            } else if (invitations.length === 0) {
                              let newInvites = curUserEmails.map(to_user_email => {
                                return {to_user_email, from_user_email: fromEmail}});
                              Invitation.insertMany(newInvites, function(err) {
                                if (err) return console.error(err);
                                res.json({ type: "success", 
                                  message: getInviteSendSuccessMessage(curUserEmails)});
                              })
                            }
                          })
                        } else if (nonCurUserEmails.length) {
                          sendEmail({from_email: fromEmail,
                                    to_email_ar: nonCurUserEmails, 
                                    referral_id: referralId})
                            .then(resp => {
                              if (getSuccessCount(resp) === nonCurUserEmails.length) {
                                res.json({ type: "success",
                                  message: getEmailSendSuccessMessage(nonCurUserEmails)});
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
router.get("/user/:from_email",
    //passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        const {from_email} = req.params;

        Invitation.find({"from_user_email": from_email, "approved": false, "rejected": {$ne: true}})
          .sort({createdOn: 1})
          .exec(function (err, invitations) {
            if (err) {
                return handleError(err);
            }
            if (invitations && invitations.length) {
                res.status(200).json({ type: "success", invitations})
            } else {
                res.status(200).json({ type: "success", message: "There are no pending invitations"})
            }
          }
        )
    }
);

//Returns invitation requests for the user
router.get("/user/requests/:to_email",
    function(req, res, next) {
        const {to_email} = req.params;

        Invitation.find({"to_user_email": to_email, "approved": false, "rejected": {$ne: true}})
          .sort({createdOn: 1})
          .exec(function (err, invitations) {
            if (err) {
                return handleError(err);
            }
            if (invitations && invitations.length) {
                res.status(200).json({ type: "success", invitations})
            } else {
                res.status(200).json({ type: "success", message: "There are no pending invitation requests"})
            }
          }
        )
    }
);

//Returns contacts that the current user accepted invitations from
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
        let contacts = [];
        contacts = invitations.map(invite => {
          return invite.to_user_email === to_email ? invite.from_user_email: invite.to_user_email;
        });
        //if search query provided
        if(req.query.q){
          contacts = contacts.filter(contact => contact.includes(req.query.q))
                             .map(filteredContact => filteredContact.split('@')[0]);                             
        }
        res.status(201).json({type: 'success', contacts});
      } else {
        res.status(201).json({type: 'success', message: 'No contacts were found.', contacts: []})
      }
    });
  }
);

//approve the request
router.put("/user/:to_email/approve", (req, res) => {
  invitationRejectApproveHelper(req,res,'approved');
});

//reject the request
router.put("/user/:to_email/reject", (req, res) => {
  invitationRejectApproveHelper(req,res,'rejected');
});
module.exports = router;
