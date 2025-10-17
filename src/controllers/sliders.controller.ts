import { Request, Response } from "express";
import prisma from "../models/prisma";

// get sliders
const slidersGet = async (req: Request, res: Response) => {
  try {
    const sliders = await prisma.sliders.findMany();
    res
      .status(200)
      .json({ message: "sliders data fetched successfully", sliders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// create sliders
const slidersCreate = async (req: Request, res: Response) => {
  try {
    const { sliders } = req.body;
    console.log(sliders);

    if (!Array.isArray(sliders) || sliders.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No sliders provided" });
    }

    // 1️⃣ Delete all existing sliders
    await prisma.sliders.deleteMany({});

    // 2️⃣ Create new sliders
    const createdSliders = await prisma.sliders.createMany({
      data: sliders.map((s) => ({
        image: s.image,
        url: s.url,
        caption: s.caption,
      })),
    });

    res.status(200).json({
      success: true,
      message: "All sliders replaced successfully",
      total: sliders.length,
    });
  } catch (error) {
    console.error("Slider replace error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export { slidersCreate, slidersGet };
