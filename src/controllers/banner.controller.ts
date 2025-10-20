import { Request, Response } from "express";
import prisma from "../models/prisma";

const createBanner = async (req: Request, res: Response) => {
  try {
    const { banners } = req.body;
    const { id } = req.params;
    console.log(id);

    if (!Array.isArray(banners) || banners.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No sliders provided" });
    }

    await prisma.banner.deleteMany({
      where: { banner: `banner-${id}` },
    });

    const newBanner = await prisma.banner.createMany({
      data: banners.map((b) => ({
        banner: b.banner,
        image: b.image,
        url: b.url,
        caption: b.caption,
      })),
    });
    res
      .status(201)
      .json({ message: `create banner-${id} successfully`, newBanner });
  } catch (error) {
    res.status(501).json({ message: "create banner failed", error });
  }
};

export { createBanner };
