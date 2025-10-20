"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./product.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const category_route_1 = __importDefault(require("./category.route"));
const sliders_route_1 = __importDefault(require("./sliders.route"));
const subcategory_route_1 = __importDefault(require("./subcategory.route"));
const router = express_1.default.Router();
router.use("/product", product_route_1.default);
router.use("/upload", upload_route_1.default);
router.use("/promotion/sliders", sliders_route_1.default);
router.use("/category", category_route_1.default);
router.use("/sub-category", subcategory_route_1.default);
exports.default = router;
