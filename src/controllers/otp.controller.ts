import { Request, Response } from "express";
import { otpGenerate } from "../libs/optGenerator";
import prisma from "../models/prisma";
import sendOtpEmail from "../configs/nodeEmailer.config";
// import { resend, sendOtpEmail } from "../configs/resend.config";

const optSend = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const otpGen = otpGenerate();
    const newOtp = { email, otp: otpGen };
    const user = await prisma.user.findMany({
      where: { email: email },
    });

    if (user.length !== 0) {
      res.status(202).json({ message: "user already exists" });
      return;
    }
    // save otp in database
    const optUser = await prisma.otp.create({ data: newOtp });

    sendOtpEmail(email, otpGen);

    res.status(201).json({
      message: "otp send your email",
      otp: otpGen,
    });
  } catch (err) {
    res.status(501).json({ message: "otp request failed try again", err });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ message: "email verify successful", user: req.user });
  } catch (err) {
    res.status(201).json({ message: "email verify failed", err });
  }
};

export { optSend, verifyOtp };
