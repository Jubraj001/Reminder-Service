const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');

const setupJobs = () => [
  cron.schedule('*/5 * * * *', async () => {
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail({
         to: email.recipientEmail,
         subject: email.subject,
         text: email.content
      }, async (err, data) => {
        if(err) {
          console.log(error);
        } else {
         await emailService.updateTicket(email.id, { status: 'SUCCESS' });
        }
      })
    })
  })
]

module.exports = setupJobs;
