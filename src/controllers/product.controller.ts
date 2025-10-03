import { Request, Response } from "express";
import prisma from "../models/prisma"; // make sure prisma client is exported properly
import {
  generateOrderCode,
  generateProductCode,
} from "../libs/sequence.counter";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, price, variants } = req.body;

    const productId = await generateProductCode();

    if (!productId) return;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        price,
        variants,
        productId,
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export { createProduct };
