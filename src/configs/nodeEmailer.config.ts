import dotenv from "dotenv";

dotenv.config();
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  //   host: "smtp.ethereal.email",
  port: 465,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EAMIL_PASSWORD,
  },
});

export default transporter;
