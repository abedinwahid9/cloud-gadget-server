"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slidersGet = exports.slidersCreate = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
// get sliders
const slidersGet = async (req, res) => {
    try {
        const sliders = await prisma_1.default.sliders.findMany();
        res
            .status(200)
            .json({ message: "sliders data fetched successfully", sliders });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.slidersGet = slidersGet;
// create sliders
const slidersCreate = async (req, res) => {
    try {
        const { sliders } = req.body;
        if (!Array.isArray(sliders) || sliders.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No sliders provided" });
        }
        // 1️⃣ Delete all existing sliders
        await prisma_1.default.sliders.deleteMany({});
        // 2️⃣ Create new sliders
        const createdSliders = await prisma_1.default.sliders.createMany({
            data: sliders.map((s) => ({
                image: s.image,
                url: s.url,
                caption: s.caption,
            })),
        });
        res.status(200).json({
            success: true,
            message: "All sliders replaced successfully",
            total: sliders.length,
        });
    }
    catch (error) {
        console.error("Slider replace error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.slidersCreate = slidersCreate;
