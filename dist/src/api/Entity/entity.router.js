"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityRouter = void 0;
const express_1 = require("express");
const entity_controller_1 = require("./infraesctructure/entity.controller");
const checkAuth_1 = require("../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, entity_controller_1.EntityControllers.getAllEntities)
    .post('/', checkAuth_1.checkAuth, entity_controller_1.EntityControllers.saveEntity);
exports.EntityRouter = router;
