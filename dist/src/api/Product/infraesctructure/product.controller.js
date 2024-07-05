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
exports.ProductControllers = void 0;
const product_models_1 = require("../domain/product.models");
const send_res_1 = require("../../../helpers/send.res");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entity = req.query.entity;
            if (req.userData.id === '664ea0d6da2837120cc81a74') {
                const products = (yield product_models_1.ProductModel.find())
                    .filter(product => { var _a; return ((_a = product.entity) === null || _a === void 0 ? void 0 : _a.toString()) !== '6678a74f5c74083fdfaed061'; });
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', products);
            }
            if (entity) {
                const products = yield product_models_1.ProductModel.find({ entity });
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', products);
            }
            if (!req.userData.entity) {
                const products = (yield product_models_1.ProductModel.find());
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', products);
            }
            const products = yield product_models_1.ProductModel.find({ entity: req.userData.entity });
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', products);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            if (!productId)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            const product = yield product_models_1.ProductModel.findById(productId);
            if (!product)
                return (0, send_res_1.sendRes)(res, 200, false, 'Producto no encontrado', '');
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', product);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prod = req.body;
            const Product = new product_models_1.ProductModel(prod);
            yield Product.save();
            return (0, send_res_1.sendRes)(res, 200, true, 'Producto guardado con éxito', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function editProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const prod = req.body;
            let cant = 0;
            const product = yield product_models_1.ProductModel.findById(prod._id);
            if (!product)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            if (prod.inStock !== product.inStock) {
                cant = ((_a = product.inStock) !== null && _a !== void 0 ? _a : 0) + prod.inStock;
            }
            else {
                cant = product.inStock;
            }
            const product_obj = {
                name: (_b = prod.name) !== null && _b !== void 0 ? _b : product.name,
                price: (_c = prod.price) !== null && _c !== void 0 ? _c : product.price,
                inStock: cant,
            };
            yield product_models_1.ProductModel.findByIdAndUpdate(prod._id, product_obj);
            return (0, send_res_1.sendRes)(res, 200, true, 'Producto Editado', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function deleteProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            if (!productId)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            yield product_models_1.ProductModel.deleteOne({ _id: productId });
            return (0, send_res_1.sendRes)(res, 200, true, 'Producto Eliminado', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
exports.ProductControllers = {
    deleteProductById,
    getAllProducts,
    getProductById,
    saveProduct,
    editProduct,
};
