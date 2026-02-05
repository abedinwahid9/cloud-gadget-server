import { Request, Response } from "express";
import prisma from "../models/prisma";

const createZoneCharge = async (req: Request, res: Response) => {
  try {
    const zone = req.body;

    const newZone = await prisma.charge.create({
      data: zone,
    });

    res
      .status(201)
      .json({ message: "zone charge created successfully", newZone });
  } catch (err) {
    res.status(501).json({ message: "zone charge not create", err });
  }
};
export { createZoneCharge };
