"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtsRouter = void 0;
const express_1 = require("express");
const debts_controllers_1 = require("../infraestructure/debts.controllers");
const checkAuth_1 = require("../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, debts_controllers_1.DebtsControllers.getAllDebts)
    .get('/:id', checkAuth_1.checkAuth, debts_controllers_1.DebtsControllers.getDebtsById)
    .post('/', checkAuth_1.checkAuth, debts_controllers_1.DebtsControllers.saveDebt)
    .delete('/:id', checkAuth_1.checkAuth, debts_controllers_1.DebtsControllers.deleteDebt);
exports.DebtsRouter = router;
