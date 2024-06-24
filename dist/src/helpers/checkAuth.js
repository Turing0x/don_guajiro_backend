"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const send_res_1 = require("./send.res");
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers['access-token'];
            if (!token)
                return (0, send_res_1.sendRes)(res, 500, false, 'No hay token en la peticion', '');
            const { username, id, entity } = jsonwebtoken_1.default.verify(token, (process.env.JWT_KEY_APP || ''));
            req.userData = { id, username, entity };
            return next();
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 500, false, 'Problema con el token de acceso', error);
        }
    });
}
exports.checkAuth = checkAuth;
