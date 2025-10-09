import { Request, Response } from "express";
import prisma from "../models/prisma";

const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = req.body;

    const category = await prisma.category.createMany({
      data: newCategory,
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
    const categoryId = req.params.id;

    const deleteCategory = await prisma.category.delete({
      where: { id: categoryId },
    });

    res.status(203).json({
      message: `this ${categoryId} is delete successfully`,
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
};
