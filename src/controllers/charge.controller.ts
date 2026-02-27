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

    res.status(200).json({ message: "all zone get successfully", zone });
  } catch (err) {
    res.status(500).json({ message: "not get zone", err });
  }
};

const deleteZoneCharge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteZone = await prisma.charge.delete({
      where: { id: id },
    });
    res.status(203).json({ message: "zone charge delete successfully", id });
  } catch (err) {
    res.status(503).json({ message: "not get zone", err });
  }
};
const updateZoneCharge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const zoneCharge = req.body;

    const updateZone = await prisma.charge.update({
      where: { id: id },
      data: { ...zoneCharge },
    });
    res
      .status(202)
      .json({ message: "zone charge delete successfully", updateZone });
  } catch (err) {
    res.status(502).json({ message: "not get zone", err });
  }
};

export { createZoneCharge, getZoneCharge, deleteZoneCharge, updateZoneCharge };
