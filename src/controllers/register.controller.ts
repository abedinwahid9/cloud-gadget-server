import { Request, Response } from "express";
import prisma from "../models/prisma";

const userCreate = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newUser = await prisma.user.create({ data: { ...data } });
    console.log(newUser);
  } catch (err) {
    res.status(200).json({ message: "signup failed", err });
  }
};

export { userCreate };
