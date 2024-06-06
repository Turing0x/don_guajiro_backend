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
exports.SalesControllers = void 0;
const send_res_1 = require("../../../helpers/send.res");
const sales_model_1 = require("../models/sales.model");
class SalesControllers {
    static getAllSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, pending } = req.query;
                if (pending === 'false') {
                    const sales = yield sales_model_1.SalesModel.find({ $and: [{ date }, { finished: true }] }).lean();
                    return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', sales);
                }
                const sales = yield sales_model_1.SalesModel.find({ $and: [{ date }, { finished: false }] }).lean();
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', sales);
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
    static getSalesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
                const debt = yield sales_model_1.SalesModel.findById(id);
                if (!debt)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Venta no encontrado', '');
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
    static saveSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const debt = new sales_model_1.SalesModel(data);
                yield debt.save();
                return (0, send_res_1.sendRes)(res, 200, true, 'Venta Registrada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static markSaleAsFinished(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
                const debt = yield sales_model_1.SalesModel.findById(id);
                if (!debt)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Venta no encontrada', '');
                debt.finished = true;
                yield debt.save();
                return (0, send_res_1.sendRes)(res, 200, true, 'Venta Registrada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static deleteSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Operación no encontrada', '');
                yield sales_model_1.SalesModel.deleteOne({ _id: id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Venta Eliminada Correctamente', '');
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
exports.SalesControllers = SalesControllers;
