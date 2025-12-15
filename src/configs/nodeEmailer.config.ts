const nodemailer = require("nodemailer");
import dotenv from "dotenv";

dotenv.config();

if (!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD) {
  throw new Error("Missing email environment variables");
}

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (toEmail: string, otp: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Cloudie Gadget OTP" <cloudiegadget@gmail.com>`,
      to: toEmail,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>OTP Verification</h2>
          <p>Your OTP code is:</p>
          <h1>${otp}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    });

    // console.log("OTP email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return false;
  }
};

export default sendOtpEmail;
