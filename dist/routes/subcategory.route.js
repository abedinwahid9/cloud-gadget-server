"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subcategory_controller_1 = require("../controllers/subcategory.controller");
const router = express_1.default.Router();
router.post("/", subcategory_controller_1.createSubCategory);
router.delete("/:id", subcategory_controller_1.deleteSubCategoryById);
exports.default = router;
