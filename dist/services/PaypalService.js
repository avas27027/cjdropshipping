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
const EnvVars_1 = __importDefault(require("@src/constants/EnvVars"));
const base = "https://api-m.sandbox.paypal.com";
const generateAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!EnvVars_1.default.Paypal.clientID || !EnvVars_1.default.Paypal.clientSecret)
            throw new Error("MISSING_API_CREDENTIALS");
        const auth = Buffer.from(EnvVars_1.default.Paypal.clientID + ":" + EnvVars_1.default.Paypal.clientSecret).toString("base64");
        const response = yield fetch(`${base}/v1/oauth2/token`, {
            method: "POST", body: "grant_type=client_credentials", headers: { Authorization: `Basic ${auth}`, },
        });
        const data = yield response.json();
        return data.access_token;
    }
    catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
});
const createOrder = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("shopping cart information passed from the frontend createOrder() callback:", cart);
    const accessToken = yield generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "1.00",
                },
            },
        ],
    };
    const response = yield fetch(url, {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
        },
        method: "POST", body: JSON.stringify(payload),
    });
    return handleResponse(response);
});
const captureOrder = (orderID) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    const response = yield fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return handleResponse(response);
});
function handleResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonResponse = yield response.json();
            return { jsonResponse, httpStatusCode: response.status, };
        }
        catch (err) {
            const errorMessage = yield response.text();
            throw new Error(errorMessage);
        }
    });
}
exports.default = {
    generateAccessToken,
    createOrder,
    captureOrder
};
