import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const ejs = require('ejs');


dotenv.config(); // Make sure to load environment variables from .env file
const path = require("path");
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
    const templatePath = path.join(__dirname, '../views/emailtemplate.ejs');
    const url = `http://localhost:${process.env.PORT}/api/verifyemail?token=${token}`;
  
    try {
     
      const emailHTML = await ejs.renderFile(templatePath, { url });
  
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Email Verification',
        html: emailHTML, 
      });
  
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
};
  
