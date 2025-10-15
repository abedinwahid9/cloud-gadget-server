import { Request, Response } from "express";
import prisma from "../models/prisma";

const slidersCreate = async (req: Request, res: Response) => {
  try {
    const count = await prisma.sliders.count();
    if (count >= 5) {
      return res
        .status(400)
        .json({ message: "Cannot add more than 5 sliders" });
    }
    const slider = req.body.sliders;
    const newSlider = await prisma.sliders.createMany({ data: slider });
    res
      .status(201)
      .json({ message: "Sliders created successfully", newSlider });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { slidersCreate };
