const invitationRejectApproveHelper = (req,res,action) => {
  const {to_email} = req.params;
  const {from_email} = req.body;
  const Invitation = require("../models/invitation");

  Invitation.findOne({
      "from_user_email": from_email,
      "to_user_email": to_email
  }, (err, invitation) => {
     if(err) return console.error(err);
     if(invitation){
       invitation[action]=true;
       invitation.save();
       res.status(200).json({[action]: invitation[action], "from_user_email": invitation.from_user_email});
     }
     else {
       res.status(400).json({"error": `Could not find ${action} property`})
     }
   });
}

module.exports = invitationRejectApproveHelper;
