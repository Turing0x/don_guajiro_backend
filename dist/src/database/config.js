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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const env_1 = require("../environments/env");
const mongoose = require('mongoose');
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(env_1.Environment.MONGO_URL);
        console.clear();
        console.log('Base de datos Online');
    }
    catch (error) {
        throw new Error('Error en la base de datos');
    }
});
exports.dbConnection = dbConnection;
module.exports = {
    dbConnection: exports.dbConnection
};
