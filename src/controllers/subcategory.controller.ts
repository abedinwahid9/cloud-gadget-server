import { Request, Response } from "express";
import prisma from "../models/prisma";

const getAllSubCategory = async (req: Request, res: Response) => {};

const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { subCategories } = req.body;
    if (!Array.isArray(subCategories) || subCategories.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No subcategory provided" });
    }

    const newSubCategory = await prisma.subCategory.createMany({
      data: subCategories.map((c) => ({
        label: c.label,
        value: c.value,
        slug: c.slug,
        categoryId: c.categoryId,
      })),
    });

    res
      .status(201)
      .json({ message: "sub-category create successfully", newSubCategory });
  } catch (error) {
    res.status(501).json({ message: "Error creating subcategory", error });
  }
};

export { createSubCategory, getAllSubCategory };
