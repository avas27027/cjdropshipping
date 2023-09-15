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
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const PaypalService_1 = __importDefault(require("@src/services/PaypalService"));
function paypalCreateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { cart } = req.body;
            const { jsonResponse, httpStatusCode } = yield PaypalService_1.default.createOrder(cart);
            return res.status(httpStatusCode).json(jsonResponse);
        }
        catch (error) {
            console.error("Failed to create order:", error);
            return res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({ error: "Failed to create order." });
        }
    });
}
function paypalCaptureOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderID } = req.params;
            const { jsonResponse, httpStatusCode } = yield PaypalService_1.default.captureOrder(orderID);
            res.status(httpStatusCode).json(jsonResponse);
        }
        catch (error) {
            console.error("Failed to create order:", error);
            res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({ error: "Failed to capture order." });
        }
    });
}
exports.default = {
    paypalCaptureOrder,
    paypalCreateOrder
};
