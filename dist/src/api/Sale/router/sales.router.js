"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRouter = void 0;
const express_1 = require("express");
const sales_controllers_1 = require("../infraestructure/sales.controllers");
const router = (0, express_1.Router)();
router
    .get('/', sales_controllers_1.SalesControllers.getAllSales)
    .get('/:id', sales_controllers_1.SalesControllers.getSalesById)
    .post('/', sales_controllers_1.SalesControllers.saveSale)
    .put('/:id', sales_controllers_1.SalesControllers.markSaleAsFinished)
    .delete('/:id', sales_controllers_1.SalesControllers.deleteSale);
exports.SalesRouter = router;
