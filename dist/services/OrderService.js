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
const fs = require('fs');
const KeyService_1 = __importDefault(require("@src/services/KeyService"));
const fetcher = (api, aToken, method, body) => __awaiter(void 0, void 0, void 0, function* () { return yield fetch(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order${api}`, { method: method, headers: { 'CJ-Access-Token': aToken, "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json()); });
const authFecth = (aToken) => __awaiter(void 0, void 0, void 0, function* () { return yield fetch(`https://strapi3-gm7c.onrender.com/api/users/me`, { method: 'GET', headers: { 'Authorization': `Bearer ${aToken}` } }).then((res) => res.json()); });
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        const orderList = yield fetcher(`/list`, key.data.accessToken, "GET");
        return orderList.data.list.filter((e) => e.orderStatus != 'TRASH');
    });
}
function getOrdersByUser(JWT) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        const orderList = yield fetcher(`/list`, key.data.accessToken, "GET");
        return yield authFecth(JWT).then((e) => {
            if ('error' in e)
                return e;
            else
                return orderList.data.list.filter((el) => {
                    return el.orderNum == e.id && el.orderStatus != 'TRASH';
                });
        });
    });
}
function postOrder(order, JWT) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        return yield authFecth(JWT).then((e) => __awaiter(this, void 0, void 0, function* () {
            if ('error' in e)
                return e;
            else {
                order.orderNumber = e.id;
                order.shippingCustomerName = e.username;
                console.log(order);
                const response = yield fetcher(`/createOrder`, key.data.accessToken, "POST", order);
                return response;
            }
        }));
    });
}
exports.default = {
    getOrders,
    getOrdersByUser,
    postOrder
};
