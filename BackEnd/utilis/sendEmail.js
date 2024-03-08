const Sib = require("sib-api-v3-sdk");

const sendEmail = async (options) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SEND_EMAIL_API_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: process.env.FROM_EMAIL,
    name: process.env.FROM_NAME,
  };

  const receivers = [
    {
      email: options.email,
    },
  ];
  const message = {
    sender,
        to: receivers,
        subject: options.subject,
        textContent: options.message,
        htmlContent: `<a href=${options.url}><button>Click Here</button></a>`,
        params: {
            role: 'Frontend',
        },
  }
  await tranEmailApi
    .sendTransacEmail(message)
    .then(console.log('success'))
    .catch(console.log('error'))
};
module.exports = sendEmail;
