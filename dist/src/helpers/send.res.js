"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRes = void 0;
const sendRes = (res, statusNum, success, message, data) => {
    res.status(statusNum).json({
        success,
        api_message: message,
        data
    });
};
exports.sendRes = sendRes;
