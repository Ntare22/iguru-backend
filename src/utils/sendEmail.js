import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iguru.rw@gmail.com',
    pass: `${process.env.passcode}`,
  },
});

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'Iguru Insurance',
    link: 'Iguru Insurance',
  },
});

const sendMsg = (newUserEmail, firstName, content, link) => {
  const email = mailGenerator.generate({
    body: {
      name: firstName,
      intro: content.intro,
      signature: content.signature,
      action: {
        instructions: content.instruction,
        button: {
          color: '#22bc66',
          text: content.text,
          link,
        },
      },
    },
  });
  const msg = {
    to: newUserEmail,
    from: 'iguru.rw@gmail.com',
    subject: 'Iguru Insurance',
    html: email,
  };

  return transporter.sendMail(msg, (error) => {
    if (error) {
      return error;
    }
    return 'success';
  });
};

export default sendMsg;
