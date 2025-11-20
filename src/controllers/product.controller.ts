import { Request, Response } from "express";
import prisma from "../models/prisma";
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

// get product by collection
const getCollectionProduct = async (req: Request, res: Response) => {
  try {
    const { collection } = req.params;
    const selectQuery = Object.keys(req.query).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    let allProduct;

    if (selectQuery && Object.keys(selectQuery).length > 0) {
      allProduct = await prisma.product.findMany({
        where: { collections: collection, status: true },
        select: selectQuery,
      });
    } else {
      allProduct = await prisma.product.findMany({
        where: { collections: collection },
      });
    }

    res.status(200).json({ message: "all data get successfully", allProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "product can't get", error });
  }
};

// max price
const maxProductPrice = async (req: Request, res: Response) => {
  try {
    const maxPrice = await prisma.product.aggregate({
      _max: {
        price: true,
      },
    });

    res.status(200).json({
      message: "successfully get max price",
      maxPrice: maxPrice._max.price,
    });
  } catch (err) {
    res.status(500).json({ message: "max price not get", err });
  }
};

// get all data
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const fields = req.query.fields as string;
    const {
      sortBy,
      orderSort,
      maxPrice,
      minPrice,
      status,
      category,
      sub_category,
    } = req.query;

    // maxPrice and minPrice sort
    const price: { gte?: number; lte?: number } = {};
    if (typeof minPrice === "string" && typeof maxPrice === "string") {
      price.gte = Number(minPrice);
      price.lte = Number(maxPrice);
    }

    // des & asc order query
    const orderBy: Record<string, "asc" | "desc"> = {};
    if (typeof sortBy === "string" && orderSort) {
      orderBy[sortBy] = orderSort === "desc" ? "desc" : "asc";
    }

    // specific filed data get
    const selectField = fields ? fields.split(",") : [];
    const selectQuery = selectField.reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

    // query options
    const queryOptions: any = { where: {} };

    // check orderBy
    if (sortBy && orderSort) {
      queryOptions.orderBy = orderBy;
    }

    // check fields
    if (selectField && fields) {
      queryOptions.select = selectQuery;
    }
    // filter by price range
    if (maxPrice && minPrice) {
      queryOptions.where.price = price;
    }
    // only fetch active product
    if (status) {
      queryOptions.where.status = Boolean(status);
    }

    // category and sub category find
    if (category) {
      queryOptions.where.category = category;
    }
    if (category && sub_category) {
      queryOptions.where.sub_category = sub_category;
    }

    let allProduct = await prisma.product.findMany(queryOptions);
    res.status(200).json({ message: "all data get successfully", allProduct });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "product can't get", error });
  }
};

// delete product by id
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await prisma.product.delete({
      where: { id: productId },
    });
    res.status(203).json({
      message: `successfully delete this ${productId} product`,
      deleteProduct,
    });
  } catch (error) {
    res.status(503).json({ message: "this product can't delete", error });
  }
};

// update product by id
const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updataProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...updateData,
      },
    });

    res.status(203).json({
      message: `this ${productId} is updated successfully`,
      updataProduct,
    });
  } catch (error) {
    res.status(504).json({ message: "update functionality error", error });
  }
};

// update product status by id
const updateProductStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const productId = req.params.id;

    const updataStatus = await prisma.product.update({
      where: { id: productId },
      data: { status: Boolean(status) },
    });

    res
      .status(203)
      .json({ message: `${productId}product status updated`, updataStatus });
  } catch (error) {
    res.status(504).json({ message: "update functionality error", error });
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  maxProductPrice,
  getCollectionProduct,
  updateProductStatus,
};
