import { Request, Response } from "express";
import prisma from "../models/prisma";
import { error } from "console";

// merge cate with sub cate
const mergeCategories = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findMany();
    const subCategory = await prisma.subCategory.findMany();

    const categories = category.map((cat) => {
      const match = subCategory.filter((s) => s.categoryId === cat.id);
      return { ...cat, subCategory: match };
    });

    res
      .status(200)
      .json({ message: "merge category get successfully", categories });
  } catch (error) {
    res.status(500).json({ message: "mergeCategories are not get", error });
  }
};

// create category
const createCategory = async (req: Request, res: Response) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No sliders provided" });
    }

    const category = await prisma.category.createMany({
      data: categories.map((c) => ({
        value: c.value,
        label: c.label,
        slug: c.slug,
        image: c.image,
      })),
    });

    res.status(201).json({ message: "category create successfully", category });
  } catch (error) {
    res.status(501).json({ message: "category can't create", error });
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = await prisma.category.findMany();

    res.status(200).json({ message: "category get successfully", allCategory });
  } catch (error) {
    res.status(500).json({ message: "category isn't get", error });
  }
};

const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteSubCat = await prisma.subCategory.deleteMany({
      where: {
        categoryId: id,
      },
    });
    const deleteCategory = await prisma.category.delete({
      where: { id: id },
    });

    res.status(203).json({
      message: `this ${id} is delete successfully`,
      deleteCategory,
    });
  } catch (error) {
    res
      .status(503)
      .json({ message: "category delete isn't working functionality", error });
  }
};

const updataCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const newCategory = req.body;

    const updateCategory = await prisma.category.update({
      where: { id: categoryId },
      data: newCategory,
    });

    res.status(204).json({
      message: `this ${categoryId} product update successfully`,
      updateCategory,
    });
  } catch (error) {
    res
      .status(504)
      .json({ message: "category update can't work, try again", error });
  }
};

export {
  createCategory,
  getAllCategory,
  deleteCategoryById,
  updataCategoryById,
  mergeCategories,
};
