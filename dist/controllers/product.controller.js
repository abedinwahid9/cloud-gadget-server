"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../models/prisma")); // make sure prisma client is exported properly
const sequence_counter_1 = require("../libs/sequence.counter");
// create product
const createProduct = async (req, res) => {
    try {
        const productId = await (0, sequence_counter_1.generateProductCode)();
        const newProduct = {
            ...req.body,
            productId,
            reviews: [],
        };
        if (!productId)
            return;
        const product = await prisma_1.default.product.create({
            data: newProduct,
        });
        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(501).json({ message: "product can't create", error });
    }
};
exports.createProduct = createProduct;
// get product by id
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const productById = await prisma_1.default.product.findUnique({
            where: { id: productId },
        });
        res
            .status(200)
            .json({ message: "single product get successfully", productById });
    }
    catch (error) {
        res.status(500).json({ message: "single product can't get", error });
    }
};
exports.getProductById = getProductById;
// get all data
const getAllProduct = async (req, res) => {
    try {
        const allProduct = await prisma_1.default.product.findMany();
        res.status(200).json({ message: "all data get successfully", allProduct });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "product can't get", error });
    }
};
exports.getAllProduct = getAllProduct;
// delete product by id
const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await prisma_1.default.product.delete({
            where: { id: productId },
        });
        res.status(203).json({
            message: `successfully delete this ${productId} product`,
            deleteProduct,
        });
    }
    catch (error) {
        res.status(503).json({ message: "this product can't delete", error });
    }
};
exports.deleteProductById = deleteProductById;
// update product by id
const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const updataProduct = await prisma_1.default.product.update({
            where: { id: productId },
            data: {
                ...updateData,
            },
        });
        res
            .status(203)
            .json({
            message: `this ${productId} is updated successfully`,
            updataProduct,
        });
    }
    catch (error) {
        res.status(504).json({ message: "update functionality error", error });
    }
};
exports.updateProductById = updateProductById;
