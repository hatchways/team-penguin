const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Invitation = require("../database/models/invitation");
const router = express.Router();

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

        Invitation.find({"to_user": new objId(id), "approved": true },
            function (err, invitations) {
                if (err) {
                    return handleError(err);
                }
                if (invitations && invitations.length) {
                    let contacts = [];
                    invitations.forEach((invite, idx) => {
                        User.findById(invite.from_user.toString(), function(err, user) {
                            if (err) return handleError(err);
                            if (user) {
                                contacts.push(user);
                                if (idx === invitations.length - 1) {
                                    res.json({ type: "success", contacts});
                                }
                            }
                        })
                    })
                } else {
                    res.json({ type: "success", message: "There are no pending invitations"})
                }
            }
        )
    }
);

module.exports = router;