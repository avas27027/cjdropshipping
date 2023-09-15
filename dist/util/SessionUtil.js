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
const classes_1 = require("@src/other/classes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvVars_1 = __importDefault(require("../constants/EnvVars"));
const Errors = {
    ParamFalsey: 'Param is falsey',
    Validation: 'JSON-web-token validation failed.',
};
const Options = {
    expiresIn: EnvVars_1.default.Jwt.Exp,
};
function getSessionData(req) {
    const { Key } = EnvVars_1.default.CookieProps, jwt = req.signedCookies[Key];
    return _decode(jwt);
}
function addSessionData(res, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!res || !data) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.BAD_REQUEST, Errors.ParamFalsey);
        }
        const jwt = yield _sign(data), { Key, Options } = EnvVars_1.default.CookieProps;
        return res.cookie(Key, jwt, Options);
    });
}
function clearCookie(res) {
    const { Key, Options } = EnvVars_1.default.CookieProps;
    return res.clearCookie(Key, Options);
}
function _sign(data) {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.sign(data, EnvVars_1.default.Jwt.Secret, Options, (err, token) => {
            return err ? rej(err) : res(token || '');
        });
    });
}
function _decode(jwt) {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.verify(jwt, EnvVars_1.default.Jwt.Secret, (err, decoded) => {
            return err ? rej(Errors.Validation) : res(decoded);
        });
    });
}
exports.default = {
    addSessionData,
    getSessionData,
    clearCookie,
};
