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
exports.DebtsTypeControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const debtsType_model_1 = require("../models/debtsType.model");
function getAllDebtsType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const debtsType = yield debtsType_model_1.DebtTypeModel.find({ status: true });
            return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', debtsType);
        }
        catch (error) {
            if (error instanceof Error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error.message);
            }
            else {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        }
    });
}
function SaveDebtsType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name } = req.body;
            if (!name || name === '')
                return (0, send_res_1.sendRes)(res, 200, false, 'Rellene el campo', '');
            name = name.toLowerCase();
            const debt = yield debtsType_model_1.DebtTypeModel.findOne({ name, status: true });
            const debts2 = yield debtsType_model_1.DebtTypeModel.findOne({ name, status: false });
            if (debt)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ya existe este nombre', '');
            else if (debts2) {
                console.log('pedro');
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', yield debtsType_model_1.DebtTypeModel.findByIdAndUpdate(debts2._id, { status: true }, { new: true }));
            }
            const debtsType = yield debtsType_model_1.DebtTypeModel.create({ name, status: true });
            return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', debtsType);
        }
        catch (error) {
            if (error instanceof Error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error.message);
            }
            else {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        }
    });
}
function deleteDebtsType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('epepepepeep');
        try {
            yield debtsType_model_1.DebtTypeModel.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
            return (0, send_res_1.sendRes)(res, 200, true, 'Operación Eliminada Exitosamente', '');
        }
        catch (error) {
            if (error instanceof Error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error.message);
            }
            else {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        }
    });
}
exports.DebtsTypeControllers = {
    getAllDebtsType,
    SaveDebtsType,
    deleteDebtsType
};
