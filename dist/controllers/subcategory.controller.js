"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategoryById = exports.getAllSubCategory = exports.createSubCategory = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
const getAllSubCategory = async (req, res) => { };
exports.getAllSubCategory = getAllSubCategory;
const createSubCategory = async (req, res) => {
    try {
        const { subCategories } = req.body;
        if (!Array.isArray(subCategories) || subCategories.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No subcategory provided" });
        }
        const newSubCategory = await prisma_1.default.subCategory.createMany({
            data: subCategories.map((c) => ({
                label: c.label,
                value: c.value,
                slug: c.slug,
                categoryId: c.categoryId,
            })),
        });
        res
            .status(201)
            .json({ message: "sub-category create successfully", newSubCategory });
    }
    catch (error) {
        res.status(501).json({ message: "Error creating subcategory", error });
    }
};
exports.createSubCategory = createSubCategory;
const deleteSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSubCategory = await prisma_1.default.subCategory.delete({
            where: { id },
        });
        res
            .status(204)
            .json({ message: "delete successfully done", deleteSubCategory });
    }
    catch (error) {
        res.status(504).json({ message: "sub category delete failed", error });
    }
};
exports.deleteSubCategoryById = deleteSubCategoryById;
