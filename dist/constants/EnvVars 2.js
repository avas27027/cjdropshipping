"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    NodeEnv: ((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : ''),
    Port: ((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0),
    CookieProps: {
        Key: 'ExpressGeneratorTs',
        Secret: ((_c = process.env.COOKIE_SECRET) !== null && _c !== void 0 ? _c : ''),
        Options: {
            httpOnly: true,
            signed: true,
            path: ((_d = process.env.COOKIE_PATH) !== null && _d !== void 0 ? _d : ''),
            maxAge: Number((_e = process.env.COOKIE_EXP) !== null && _e !== void 0 ? _e : 0),
            domain: ((_f = process.env.COOKIE_DOMAIN) !== null && _f !== void 0 ? _f : ''),
            secure: (process.env.SECURE_COOKIE === 'true'),
        },
    },
    Jwt: {
        Secret: ((_g = process.env.JWT_SECRET) !== null && _g !== void 0 ? _g : ''),
        Exp: ((_h = process.env.COOKIE_EXP) !== null && _h !== void 0 ? _h : ''),
    },
    CJ: {
        username: ((_j = process.env.CJ_USERNAME) !== null && _j !== void 0 ? _j : ''),
        password: ((_k = process.env.CJ_PASSWORD) !== null && _k !== void 0 ? _k : '')
    },
    Paypal: {
        clientID: ((_l = process.env.PAYPAL_CLIENT_ID) !== null && _l !== void 0 ? _l : ''),
        clientSecret: ((_m = process.env.PAYPAL_CLIENT_SECRET) !== null && _m !== void 0 ? _m : '')
    }
};
