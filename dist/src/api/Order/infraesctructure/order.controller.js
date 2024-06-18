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
exports.OrderControllers = void 0;
const order_models_1 = require("../domain/order.models");
const product_models_1 = require("../../Product/domain/product.models");
const send_res_1 = require("../../../helpers/send.res");
const user_model_1 = require("../../Users/models/user.model");
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, userId } = req.query;
            const user = yield user_model_1.UserModel.findById(userId);
            if (!user)
                return (0, send_res_1.sendRes)(res, 200, false, 'El usuario no existe', '');
            if (user.role === 'seller') {
                const orders = yield order_models_1.OrderModel.find({ $and: [{ date }, { seller: userId }] })
                    .populate('seller').lean();
                for (const order of orders) {
                    const prod = yield product_models_1.ProductModel.findById(order.product.id);
                    if (prod) {
                        const cantToBuy = order.product.cantToBuy;
                        prod.cantToBuy = cantToBuy;
                        order.product = prod;
                    }
                }
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', orders);
            }
            else {
                const orders = yield order_models_1.OrderModel.find({ date })
                    .populate('seller').lean();
                for (const order of orders) {
                    const prod = yield product_models_1.ProductModel.findById(order.product.id);
                    if (prod) {
                        const cantToBuy = order.product.cantToBuy;
                        prod.cantToBuy = cantToBuy;
                        order.product = prod;
                    }
                }
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', orders);
            }
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function getAllRequested(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date } = req.params;
            const orders = yield order_models_1.OrderModel.find({ date });
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', orders);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function getOrdersByCommercial(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, commercialCode } = req.params;
            const orders = yield order_models_1.OrderModel.find({ $and: [{ date }, { 'seller.commercial_code': commercialCode }] });
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', orders);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            if (!orderId)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            const order = yield order_models_1.OrderModel.findById(orderId);
            if (!order)
                return (0, send_res_1.sendRes)(res, 200, false, 'Order no encontrado', '');
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', order);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function getDailyResume(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date } = req.params;
            const map = new Map();
            const list = [];
            const orders = yield order_models_1.OrderModel.find({ date })
                .populate('product').lean();
            orders.forEach((order) => __awaiter(this, void 0, void 0, function* () {
                const prod = yield product_models_1.ProductModel.findById(order.product);
                if (prod) {
                    if (!map.has(prod._id)) {
                        prod.cantToBuy = 1;
                        map.set(prod._id, prod);
                    }
                    else {
                        const finalcantToBuy = map.get(prod._id).cantToBuy + prod.cantToBuy;
                        prod.cantToBuy = finalcantToBuy;
                        map.set(prod._id, prod);
                    }
                }
            }));
            for (const val of map.values()) {
                list.push(val);
            }
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', list);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function saveOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = req.body;
            const Order = new order_models_1.OrderModel(order);
            yield Order.save();
            yield subtractStockOfProducts(order.product.id);
            return (0, send_res_1.sendRes)(res, 200, true, 'Venta registrada', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function deleteOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            if (!orderId)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            ;
            const getter = yield order_models_1.OrderModel.findById(orderId);
            yield addStockOfProducts(String(getter === null || getter === void 0 ? void 0 : getter.product['id']));
            yield order_models_1.OrderModel.deleteOne({ _id: orderId });
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function subtractStockOfProducts(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const getter = yield product_models_1.ProductModel.findById(id);
        if (getter) {
            yield product_models_1.ProductModel.findByIdAndUpdate(getter._id, { $set: { inStock: (getter.inStock || 0) - (getter.cantToBuy || 0) } });
        }
    });
}
function addStockOfProducts(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const getter = yield product_models_1.ProductModel.findById(id);
        if (getter) {
            yield product_models_1.ProductModel.findByIdAndUpdate(getter._id, { $set: { inStock: (getter.inStock || 0) + (getter.cantToBuy || 0) } });
        }
    });
}
exports.OrderControllers = {
    getOrdersByCommercial,
    deleteOrderById,
    getAllRequested,
    getDailyResume,
    getAllOrders,
    getOrderById,
    saveOrder
};
