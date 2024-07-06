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
exports.ExpressServer = void 0;
/* eslint-disable no-undef */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = require("../routes/index.routes");
const config_1 = require("../database/config");
const env_1 = require("../environments/env");
class ExpressServer {
    constructor() {
        this.app = (0, express_1.default)();
        // Conectar la base de datos
        this.conectDB();
        // Middlewares
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(env_1.Environment.PORT, () => {
            console.clear();
            console.log('Servidor corriendo en el puerto', env_1.Environment.PORT);
        });
    }
    conectDB() {
        return __awaiter(this, void 0, void 0, function* () { yield (0, config_1.dbConnection)(); });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        // Lectura y parseo a formato JSON del body
        this.app.use(express_1.default.json());
        // Ruta publica para ver el html
        this.app.use(express_1.default.static('src/public'));
    }
    routes() { this.app.use(env_1.Environment.ROUTES_PREFIX, index_routes_1.api); }
}
exports.ExpressServer = ExpressServer;
