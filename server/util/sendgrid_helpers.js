const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({from_email, to_email_ar, referral_id}) => {
  let messages = to_email_ar.map(to_email => (
    {to: `${to_email}`,
    from: 'hatchways.tester99@gmail.com',
    subject: 'World messenger invitation',
    text: `${from_email} has invited you to connect on World messenger! Here’s the link to it! http://localhost:3000/join/${referral_id}`,}
  ))
  return sgMail.send(messages);
}

const getSuccessCount = (resp) => {
  let successCount = 0;
  resp.forEach(res => {
    if (res[0].statusCode === 202) successCount += 1;
  });
  return successCount;
}

module.exports = {sendEmail, getSuccessCount};