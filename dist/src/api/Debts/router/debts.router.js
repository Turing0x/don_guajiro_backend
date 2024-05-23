"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtsRouter = void 0;
const express_1 = require("express");
const debts_controllers_1 = require("../infraestructure/debts.controllers");
const router = (0, express_1.Router)();
router
    .get('/', debts_controllers_1.DebtsControllers.getAllDebts)
    .get('/:id', debts_controllers_1.DebtsControllers.getDebtsById)
    .post('/', debts_controllers_1.DebtsControllers.saveDebt)
    .delete('/:id', debts_controllers_1.DebtsControllers.deleteDebt);
exports.DebtsRouter = router;
