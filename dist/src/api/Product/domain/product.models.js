"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: false
    },
    price: {
        type: Number,
        require: false,
    },
    inStock: {
        type: Number,
        require: true,
    },
    cantToBuy: {
        type: Number,
        require: true,
    }
});
exports.ProductModel = mongoose_1.default.model('products', ProductSchema);
