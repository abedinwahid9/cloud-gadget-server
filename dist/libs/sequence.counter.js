"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductCode = generateProductCode;
exports.generateOrderCode = generateOrderCode;
const prisma_1 = __importDefault(require("../models/prisma"));
async function getNextSequence(name) {
    let counter = await prisma_1.default.counter.findFirst({ where: { name } });
    if (!counter) {
        counter = await prisma_1.default.counter.create({
            data: {
                name,
                seq: 1,
            },
        });
        return counter;
    }
    // 3️⃣ Increment manually
    counter = await prisma_1.default.counter.update({
        where: { id: counter.id },
        data: { seq: counter.seq + 1 }, // ✅ just add 1
    });
    return counter;
}
async function generateProductCode() {
    const counter = await getNextSequence("product");
    return `PRO-${String(counter.seq).padStart(5, "0")}`;
}
async function generateOrderCode() {
    const counter = await getNextSequence("order");
    return `ORD-${String(counter.seq).padStart(5, "0")}`;
}
