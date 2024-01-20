
const config = require('../config/config');
const api_key = config.SEND_GRID_API_KEY;
const from = config.SEND_GRID_FROM;

module.exports.sendEmail = async (to, sub, msg) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(api_key);
  const data = {
    to: to,
    from: from,
    subject: sub,
    text: 'Mail',
    html: msg
  };
  sgMail.send(data)
    .then(() => {
      console.log('Email sent successfully');
      return true;
    })
    .catch((error) => {
      console.error('Error sending email', error);
      return true;
    });

}