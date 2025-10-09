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

export { createCategory, getAllCategory };
