import { Service } from 'typedi';
import sgMail from '@sendgrid/mail';
import queue from 'queue';

const q = queue({ results: [] });

@Service()
export default class Notification {
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    q.push(function (cb) {
      (async () => {
        const { SENDGRID_API_KEY, ADMIN_EMAIL } = process.env;
        sgMail.setApiKey(SENDGRID_API_KEY);
        try {
          await sgMail.send({
            to,
            from: ADMIN_EMAIL,
            subject,
            html: message
          });
          cb(null, true);
        } catch (error) {
          cb(error, null);
        }
      })();
    });

    q.start(function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
