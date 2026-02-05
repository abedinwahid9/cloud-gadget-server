import { Request, Response } from "express";

const createAddress = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.status(501).json({ message: "user not create", err });
  }
};

export { createAddress };
