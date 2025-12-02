import { Request, Response } from "express";
import transporter from "../configs/nodeEmailer.config";
import { otpGenerate } from "../libs/optGenerator";

import prisma from "../models/prisma";

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

    const optUser = await prisma.otp.create({ data: newOtp });

    const info = await transporter.sendMail({
      from: "clodiegadget@gmail.com",
      to: email,
      subject: "Otp from Cloudie Gadget",
      html: `<b>your verify otp is ${otpGen}</b>`,
    });

    res.status(201).json({
      message: "otp send your email",
      // info
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
