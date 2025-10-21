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

const getBannerByName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const banners = await prisma.banner.findMany({
      where: { banner: `banner-${id}` },
    });

    res
      .status(200)
      .json({ message: `get banner-${id} data successfully`, banners });
  } catch (error) {
    res.status(500).json({ message: "banner data not get", error });
  }
};

const deleteBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteBanner = await prisma.banner.delete({
      where: { id },
    });
    res
      .status(204)
      .json({ message: `${id} delete successfully done`, deleteBanner });
  } catch (error) {
    res.status(504).json({ message: "delete functionality error", error });
  }
};

export { createBanner, getBannerByName, deleteBannerById };
