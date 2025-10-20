"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sliders_controller_1 = require("../controllers/sliders.controller");
const router = express_1.default.Router();
router.get("/", sliders_controller_1.slidersGet);
router.post("/", sliders_controller_1.slidersCreate);
// router.patch("/", slidersUpdate);
exports.default = router;
