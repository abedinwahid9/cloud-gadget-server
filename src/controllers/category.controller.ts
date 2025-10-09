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

export { createCategory };
