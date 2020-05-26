const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({from_email, to_email, referral_id}) => {
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

const sendEmailMultiple = ({from_email, to_email_ar, referral_id}) => {
  let messages = to_email_ar.map(to_email => {
    let msg = {
      to: `${to_email}`,
      from: 'hatchways.tester99@gmail.com',
      subject: 'World messenger invitation',
      text: `${from_email} has invited you to connect on World messenger! Here’s the link to it! localhost:3000/join/${referral_id}`,
    };
  
    return msg;
  })
  Promises.all(messages.map(msg => sgMail.send(msg)))
    .then(resp => resp.json())
    .then(json => console.log('sendgrid group results', json))
    .catch(err => console.error('sendgrid errors', err))
}

module.exports = {sendEmail, sendEmailMultiple};