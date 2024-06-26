"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EntitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
});
exports.EntityModel = mongoose_1.default.model('entities', EntitySchema);
