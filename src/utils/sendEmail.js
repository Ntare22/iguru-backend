import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jimnm2018@gmail.com',
    pass: 'honestlyme',
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
    from: 'jimnm2018@gmail.com',
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
