import { Request, Response } from "express";
import prisma from "../models/prisma"; // make sure prisma client is exported properly
import { generateProductCode } from "../libs/sequence.counter";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productId = await generateProductCode();

    const newProduct = {
      ...req.body,
      productId,
      reviews: [],
    };

    if (!productId) return;

    const product = await prisma.product.create({
      data: newProduct,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "product can't create", error });
  }
};

// get product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productById = await prisma.product.findUnique({
      where: { id: productId },
    });

    res
      .status(200)
      .json({ message: "single product get successfully", productById });
  } catch (error) {
    res.status(500).json({ message: "single product can't get", error });
  }
};

// get all data
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const allProduct = await prisma.product.findMany();

    res.status(200).json({ message: "all data get successfully", allProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "product can't get", error });
  }
};

export { createProduct, getAllProduct, getProductById };
