"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        require: true
    },
    product: {
        type: Object,
        require: true
    },
    seller: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'users',
        require: true,
    }
});
exports.OrderModel = mongoose_1.default.model('Orders', OrderSchema);