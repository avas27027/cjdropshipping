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
const KeyRepo_1 = __importDefault(require("@src/repos/KeyRepo"));
const EnvVars_1 = __importDefault(require("@src/constants/EnvVars"));
function newKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPost = KeyRepo_1.default.add;
        console.log(EnvVars_1.default.CJ.username, EnvVars_1.default.CJ.password);
        let cred = { email: EnvVars_1.default.CJ.username, password: EnvVars_1.default.CJ.password };
        const newKey = yield fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken?", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cred) }).then((res) => res.json());
        yield keyPost(newKey);
    });
}
function getKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyGet = yield KeyRepo_1.default.get();
        let today = new Date();
        if (keyGet.data != null) {
            let expireDate = new Date(keyGet.data.accessTokenExpiryDate);
            expireDate.setDate(expireDate.getDate() - 5);
            if (today >= expireDate) {
                newKey();
                return yield KeyRepo_1.default.get();
            }
            else
                return yield KeyRepo_1.default.get();
        }
        else {
            setTimeout(newKey, 60000);
            return yield KeyRepo_1.default.get();
        }
    });
}
exports.default = { getKey };
