"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRouter = void 0;
const express_1 = require("express");
const sales_controllers_1 = require("../infraestructure/sales.controllers");
const checkAuth_1 = require("../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, sales_controllers_1.SalesControllers.getAllSales)
    .get('/:id', checkAuth_1.checkAuth, sales_controllers_1.SalesControllers.getSalesById)
    .post('/', checkAuth_1.checkAuth, sales_controllers_1.SalesControllers.saveSale)
    .delete('/:id', checkAuth_1.checkAuth, sales_controllers_1.SalesControllers.deleteSale);
exports.SalesRouter = router;
