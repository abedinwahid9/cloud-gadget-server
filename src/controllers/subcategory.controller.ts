import { Request, Response } from "express";
import prisma from "../models/prisma";

const getAllSubCategory = async (req: Request, res: Response) => {
  try {
    const sub_cate = await prisma.subCategory.findMany();

    res
      .status(200)
      .json({ message: "get all sub-category data successfully", sub_cate });
  } catch (error) {
    res.status(500).json({ message: "sub-category data error", error });
  }
};

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
        image: c.image,
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

const deleteSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteSubCategory = await prisma.subCategory.delete({
      where: { id },
    });
    res
      .status(204)
      .json({ message: "delete successfully done", deleteSubCategory });
  } catch (error) {
    res.status(504).json({ message: "sub category delete failed", error });
  }
};

export { createSubCategory, getAllSubCategory, deleteSubCategoryById };
