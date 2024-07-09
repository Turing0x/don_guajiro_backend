"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtTypeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DebtTypeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    side: {
        type: Boolean,
        default: true,
    }
});
exports.DebtTypeModel = mongoose_1.default.model('debtsTypes', DebtTypeSchema);
