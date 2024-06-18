"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SalesSchema = new mongoose_1.default.Schema({
    finished: {
        type: Boolean,
        require: true,
        default: false
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    cantToBuy: {
        type: Number,
        require: true
    },
    unities: {
        type: Number,
        require: true
    },
});
exports.SalesModel = mongoose_1.default.model('sales', SalesSchema);
