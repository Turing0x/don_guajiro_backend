"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
const collections_1 = require("../helpers/collections");
const user_router_1 = require("../api/Users/router/user.router");
const debts_router_1 = require("../api/Debts/router/debts.router");
const sales_router_1 = require("../api/Sale/router/sales.router");
const order_router_1 = require("../api/Order/order.router");
const product_router_1 = require("../api/Product/product.router");
exports.api.use(`/${collections_1.COLLECTIONS.USERS}`, user_router_1.UsersRouter);
exports.api.use(`/${collections_1.COLLECTIONS.DEBTS}`, debts_router_1.DebtsRouter);
exports.api.use(`/${collections_1.COLLECTIONS.SALES}`, sales_router_1.SalesRouter);
exports.api.use(`/${collections_1.COLLECTIONS.ORDER}`, order_router_1.OrderRouter);
exports.api.use(`/${collections_1.COLLECTIONS.PRODUCT}`, product_router_1.ProductRouter);
