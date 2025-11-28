import { Request, Response } from "express";
import prisma from "../models/prisma";
import { hashPassword, passwordCompare } from "../services/auth.services";

const userCreate = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    // todo bcrypt.hash(myPlaintextPassword, saltRounds);
    const hashPass = await hashPassword(password);
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (user)
      return res
        .status(200)
        .json({ message: "this email already exists, use another email" });
    const newUser = await prisma.user.create({
      data: { email, password: hashPass, name },
    });
    res.status(200).json({ message: "signup successfully", newUser });
  } catch (err) {
    res.status(200).json({ message: "signup failed", err });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) return res.status(200).json({ message: "user is not exists" });

    // todo bcrypt.compare(password, dbPass);
    const confirmPassword = await passwordCompare(password, user.password);
    if (!confirmPassword)
      return res.status(200).json({ message: "password wrong" });

    return res.status(200).json({ message: "login successful" });
  } catch (err) {
    res.status(501).json({ message: "login failed, please try again", err });
  }
};

export { userCreate, userLogin };
