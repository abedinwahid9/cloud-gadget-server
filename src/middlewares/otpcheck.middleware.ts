import { Request, Response } from "express";
import prisma from "../models/prisma";

const optCheck = async (req: Request, res: Response, next: () => void) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.otp.findMany({
      where: { email },
    });

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const validOpt = user?.find((u) => u.otp == otp);

    if (!validOpt?.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    req.user = validOpt.email;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Email verify failed",
      err,
    });
  }
};

export { optCheck };
