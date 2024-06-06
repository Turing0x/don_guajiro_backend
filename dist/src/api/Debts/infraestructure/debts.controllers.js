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
class DebtsControllers {
    static getAllDebts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = req.query;
                const debts = yield debts_model_1.DebtModel.find({ date }).lean();
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
    static getDebtsById(req, res) {
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
    static saveDebt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const data = req.body;
                if (data._id) {
                    const existingDebt = yield debts_model_1.DebtModel.findById(data._id);
                    const newData = new debts_model_1.DebtModel({
                        _id: (_a = data._id) !== null && _a !== void 0 ? _a : existingDebt._id,
                        type: (_b = data.type) !== null && _b !== void 0 ? _b : existingDebt.type,
                        money: (_c = data.money) !== null && _c !== void 0 ? _c : existingDebt.money,
                        description: (_d = data.description) !== null && _d !== void 0 ? _d : existingDebt.description,
                        date: (_e = data.date) !== null && _e !== void 0 ? _e : existingDebt.date,
                    });
                    yield debts_model_1.DebtModel.findByIdAndUpdate(data._id, newData, { new: true });
                    return (0, send_res_1.sendRes)(res, 200, true, 'Operación Editada Exitosamente', '');
                }
                const debt = new debts_model_1.DebtModel(data);
                yield debt.save();
                return (0, send_res_1.sendRes)(res, 200, true, 'Operación Creada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static deleteDebt(req, res) {
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
}
exports.DebtsControllers = DebtsControllers;
