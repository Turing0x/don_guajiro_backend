"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DebtSchema = new mongoose_1.default.Schema({
    type: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'debtsTypes',
        require: true
    },
    money: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    }
});
exports.DebtModel = mongoose_1.default.model('debts', DebtSchema);
