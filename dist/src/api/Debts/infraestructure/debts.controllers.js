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
exports.DebtsControllers = void 0;
const send_res_1 = require("../../../helpers/send.res");
const debts_model_1 = require("../models/debts.model");
function getAllDebts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date } = req.query;
            const debts = yield debts_model_1.DebtModel.find({ date }).lean()
                .populate('type');
            return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', debts);
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
function getDebtsById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            const debt = yield debts_model_1.DebtModel.findById(id);
            if (!debt)
                return (0, send_res_1.sendRes)(res, 200, false, 'Operación no encontrada', '');
            return (0, send_res_1.sendRes)(res, 200, false, 'Resultado de la búsqueda', debt);
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
function saveDebt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const debt = new debts_model_1.DebtModel(data);
            yield debt.save();
            return (0, send_res_1.sendRes)(res, 200, true, 'Operación Creada Exitosamente', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error);
        }
    });
}
function deleteDebt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return (0, send_res_1.sendRes)(res, 200, false, 'Operación no encontrada', '');
            yield debts_model_1.DebtModel.deleteOne({ _id: id });
            return (0, send_res_1.sendRes)(res, 200, true, 'Operación Eliminada Correctamente', '');
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
exports.DebtsControllers = {
    getAllDebts,
    getDebtsById,
    saveDebt,
    deleteDebt
};
