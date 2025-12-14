import dotenv from "dotenv";

dotenv.config();
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  host: "smtp-relay.brevo.com",
  // port: 465,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EAMIL_PASSWORD,
  },
});

export default transporter;
