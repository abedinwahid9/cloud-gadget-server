"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCategories = exports.updataCategoryById = exports.deleteCategoryById = exports.getAllCategory = exports.createCategory = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
// merge cate with sub cate
const mergeCategories = async (req, res) => {
    try {
        const category = await prisma_1.default.category.findMany();
        const subCategory = await prisma_1.default.subCategory.findMany();
        const categories = category.map((cat) => {
            const match = subCategory.filter((s) => s.categoryId === cat.id);
            return { ...cat, subCategory: match };
        });
        res
            .status(200)
            .json({ message: "merge category get successfully", categories });
    }
    catch (error) {
        res.status(500).json({ message: "mergeCategories are not get", error });
    }
};
exports.mergeCategories = mergeCategories;
// create category
const createCategory = async (req, res) => {
    try {
        const { categories } = req.body;
        if (!Array.isArray(categories) || categories.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No sliders provided" });
        }
        const category = await prisma_1.default.category.createMany({
            data: categories.map((c) => ({
                value: c.value,
                label: c.label,
                slug: c.slug,
                image: c.image,
            })),
        });
        res.status(201).json({ message: "category create successfully", category });
    }
    catch (error) {
        res.status(501).json({ message: "category can't create", error });
    }
};
exports.createCategory = createCategory;
const getAllCategory = async (req, res) => {
    try {
        const allCategory = await prisma_1.default.category.findMany();
        res.status(200).json({ message: "category get successfully", allCategory });
    }
    catch (error) {
        res.status(500).json({ message: "category isn't get", error });
    }
};
exports.getAllCategory = getAllCategory;
const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSubCat = await prisma_1.default.subCategory.deleteMany({
            where: {
                categoryId: id,
            },
        });
        const deleteCategory = await prisma_1.default.category.delete({
            where: { id: id },
        });
        res.status(203).json({
            message: `this ${id} is delete successfully`,
            deleteCategory,
        });
    }
    catch (error) {
        res
            .status(503)
            .json({ message: "category delete isn't working functionality", error });
    }
};
exports.deleteCategoryById = deleteCategoryById;
const updataCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const newCategory = req.body;
        const updateCategory = await prisma_1.default.category.update({
            where: { id: categoryId },
            data: newCategory,
        });
        res.status(204).json({
            message: `this ${categoryId} product update successfully`,
            updateCategory,
        });
    }
    catch (error) {
        res
            .status(504)
            .json({ message: "category update can't work, try again", error });
    }
};
exports.updataCategoryById = updataCategoryById;
