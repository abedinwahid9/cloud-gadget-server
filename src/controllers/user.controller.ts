import { Request, Response } from "express";
import prisma from "../models/prisma";
import { Role } from "@prisma/client";

const userGetRoleBased = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;

    const user = await prisma.user.findMany({
      where: { role: role.toUpperCase() as Role },
    });

    res
      .status(200)
      .json({ message: `all ${role} user get successfully`, user });
  } catch (err) {
    res.status(500).json({ message: `user isn't correct`, err });
  }
};

export { userGetRoleBased };
