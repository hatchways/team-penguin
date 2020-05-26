const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = (from_email, to_email, referral_id) => {
  let msg = {
    to: `${to_email}`,
    from: 'hatchways.tester99@gmail.com',
    subject: 'World messenger invitation',
    text: `${from_email} has invited you to connect on World messenger! Here’s the link to it! localhost:3000/join/${referral_id}`,
  };
  sgMail.send(msg)
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
}
