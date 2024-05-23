"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../infraestructure/user.controllers");
const router = (0, express_1.Router)();
router
    .get('/', user_controllers_1.UsersControllers.getAllUsers)
    .get('/:id', user_controllers_1.UsersControllers.getUsersById)
    .post('/', user_controllers_1.UsersControllers.saveUser)
    .post('/signIn', user_controllers_1.UsersControllers.sign)
    .post('/changeActive', user_controllers_1.UsersControllers.changeActive)
    .delete('/:id', user_controllers_1.UsersControllers.deleteUser);
exports.UsersRouter = router;
