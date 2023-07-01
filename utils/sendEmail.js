import nodemailer from "nodemailer"; 
import dotenv from "dotenv";

dotenv.config();

// Email sending

export const sendEmail = async (to, VIN) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: "VOTERS IDENTIFICATION NUMBER",
    text: `Hi ${to},\n
    We received your request for a Voters Identification Number to use with your Sectify.\n
    Your VIN is: ${VIN}\n
    If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.\n
    Vote wisely.\n
    Thanks,\n
    The Fantom Sectify Team\n`,
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.messageId);
      }
    });
    console.log("VIN sent successfully");
  } catch (error) {
    console.log("Error sending VIN:", error);
  }
};









// // Function to send email notification to the admin
// async function sendNotificationEmail(formData) {
//   // Create a nodemailer transporter with your email service credentials
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     // service: 'YOUR_EMAIL_SERVICE',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   // Customize the email content and recipients
//   const mailOptions = {
//     from: process.env.EMAIL_USERNAME,
//     to: 'tosmeltungsten@gmail.com',
//     subject: 'New Registration Entry',
//     text: `A new registration entry has been received:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhoneNumber: ${formData.phoneNumber}\nPassword: ${formData.message}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Notification email sent successfully!');
//   } catch (error) {
//     console.error('Error sending notification email:', error);
//   }
// }