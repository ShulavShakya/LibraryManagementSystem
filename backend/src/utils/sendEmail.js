import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// export const sendEmail = async (email, subject, text, verifylink) => {
//   try {
//     const transporter = new nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "shakyashulav29@gmail.com",
//         pass: process.env.APP_PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: "shulavshakya29@gmail.com",
//       to: email,
//       subject: subject,
//       text: text,
//       html: `<a href =" ${verifylink}">Click here to go to our official website</a>`,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const sendEmail = async (email, subject, text, verifylink) => {
  try {
    const transporter = new nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "shakyashulav29@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "shakyashulav29@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error);
  }
};
