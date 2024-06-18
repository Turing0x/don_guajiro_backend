"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtsTypeRouter = void 0;
const express_1 = require("express");
const debtsType_controllers_1 = require("../infraestructure/debtsType.controllers");
const router = (0, express_1.Router)();
router
    .get('/', debtsType_controllers_1.DebtsTypeControllers.getAllDebtsType)
    .post('/', debtsType_controllers_1.DebtsTypeControllers.SaveDebtsType)
    .delete('/:id', debtsType_controllers_1.DebtsTypeControllers.deleteDebtsType);
exports.DebtsTypeRouter = router;
