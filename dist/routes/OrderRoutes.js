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
const OrderService_1 = __importDefault(require("@src/services/OrderService"));
const fetcher = (api, aToken, method, body) => __awaiter(void 0, void 0, void 0, function* () { return yield fetch(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order${api}`, { method: method, headers: { 'CJ-Access-Token': aToken, "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json()); });
function getOrders(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderList = yield OrderService_1.default.getOrders();
        return res.status(HttpStatusCodes_1.default.OK).json({ orderList });
    });
}
function getOrdersByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWT = req.body.JWT;
        const filterOrderList = yield OrderService_1.default.getOrdersByUser(JWT);
        return res.status(HttpStatusCodes_1.default.OK).json({ filterOrderList });
    });
}
function postOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { order, JWT } = req.body;
        const response = yield OrderService_1.default.postOrder(order, JWT);
        return res.status(HttpStatusCodes_1.default.OK).json({ response });
    });
}
exports.default = {
    getOrders,
    getOrdersByUser,
    postOrder,
};
