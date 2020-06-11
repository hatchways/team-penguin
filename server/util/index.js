const getEmailSendSuccessMessage = (emails) => {
  return `Email invitations were sent to ${emails.join(', ')}`;
}

const getEmailSendMixedMessage = (sentEmails, unsentEmails) => {
  let inviteNotCreatedEmailMessage = `Invitations were not sent to ${unsentEmails.join(', ')} because the invitation was already sent, pending, or rejected.`;
  let inviteCreatedEmailMessage = `Invitations were sent to ${sentEmails.join(', ')}.`;
  return `${inviteCreatedEmailMessage} ${inviteNotCreatedEmailMessage}`;
}

//internal invitations to registered users
const getInviteSendSuccessMessage = (emails) => {
  return `Invitations were sent to ${emails.join(', ')}.`
}

const getInviteNotSentMessage = (emails) => {
  return `Invitations were not sent to ${emails.join(', ')} because the invitation was already sent, pending, or rejected.`;
}

module.exports = {getEmailSendSuccessMessage, getEmailSendMixedMessage, getInviteSendSuccessMessage, getInviteNotSentMessage};