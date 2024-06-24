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
exports.EntityControllers = void 0;
const entity_models_1 = require("../domain/entity.models");
const send_res_1 = require("../../../helpers/send.res");
function getAllEntities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entity = yield entity_models_1.EntityModel.find();
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', entity);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function saveEntity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = req.body;
            const entity = new entity_models_1.EntityModel(order);
            yield entity.save();
            return (0, send_res_1.sendRes)(res, 200, true, 'Entidad registrada', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
exports.EntityControllers = {
    getAllEntities,
    saveEntity
};
