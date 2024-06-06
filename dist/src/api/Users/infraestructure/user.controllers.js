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
exports.UsersControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const send_res_1 = require("../../../helpers/send.res");
const user_model_1 = require("../models/user.model");
class UsersControllers {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.UserModel.find().select('-password').lean();
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', users);
            }
            catch (error) {
                if (error instanceof Error) {
                    1;
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
                }
            }
        });
    }
    static getAllSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.UserModel.find({ role: 'seller' })
                    .select('-password').lean();
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', users);
            }
            catch (error) {
                if (error instanceof Error) {
                    1;
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
                }
            }
        });
    }
    static getUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientId } = req.params;
                if (!clientId)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
                const user = yield user_model_1.UserModel.findById(clientId).select('-password');
                if (!user)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Usuario no encontrado', '');
                return (0, send_res_1.sendRes)(res, 200, false, 'Resultado de la búsqueda', user);
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
    static saveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const exist = yield user_model_1.UserModel.findOne({ username: data.username });
                if (exist) {
                    return (0, send_res_1.sendRes)(res, 401, false, 'Ya existe ese nombre en nuestro sistema', '');
                }
                const hashPassword = bcrypt_1.default.hashSync(data.password, 10);
                data.password = hashPassword;
                const user = new user_model_1.UserModel(data);
                yield user.save();
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Creado Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static sign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const exist = yield user_model_1.UserModel.findOne({ username });
                if (!exist) {
                    return (0, send_res_1.sendRes)(res, 401, false, 'Ese usuario no está registrado en nuestro sistema', '');
                }
                const compare = bcrypt_1.default.compareSync(password, exist.password);
                if (!compare)
                    return (0, send_res_1.sendRes)(res, 401, false, 'Contraseña incorrecta', '');
                const token = jsonwebtoken_1.default.sign({
                    username: exist.username,
                    user_id: exist._id,
                    enable: exist.enable
                }, process.env.JWT_KEY_APP, { expiresIn: '1d' });
                return (0, send_res_1.sendRes)(res, 200, true, 'Inicio de sesión correcto', {
                    user: {
                        username: exist.username,
                        userID: exist._id,
                        role: exist.role.toLocaleLowerCase()
                    },
                    token,
                });
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Usuario no encontrado', '');
                yield user_model_1.UserModel.deleteOne({ _id: id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Eliminado Correctamente', '');
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
    static changeActive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield user_model_1.UserModel.findOneAndUpdate({ _id: data._id }, {
                    $set: { enable: data.enable }
                });
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Editado', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        });
    }
}
exports.UsersControllers = UsersControllers;
