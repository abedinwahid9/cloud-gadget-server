"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
router.post("/", category_controller_1.createCategory);
router.get("/", category_controller_1.getAllCategory);
router.get("/merge", category_controller_1.mergeCategories);
router.delete("/:id", category_controller_1.deleteCategoryById);
router.patch("/:id", category_controller_1.updataCategoryById);
exports.default = router;
