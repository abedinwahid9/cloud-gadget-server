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

const getZoneCharge = async (req: Request, res: Response) => {
  try {
    const zone = await prisma.charge.findMany();

    res.status(500).json({ message: "all zone get successfully", zone });
  } catch (err) {
    res.status(500).json({ message: "not get zone", err });
  }
};
export { createZoneCharge, getZoneCharge };
