const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Invitation = require("../database/models/invitation");
const router = express.Router();

router.get("/user/:id/invitations",
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

module.exports = router;