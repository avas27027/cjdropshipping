"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function new_(code, result, message, openId, accessToken, accessTokenExpiryDate, refreshToken, refreshTokenExpiryDate, createDate, requestId, success) {
    return {
        "code": code !== null && code !== void 0 ? code : 200,
        "result": result !== null && result !== void 0 ? result : false,
        "message": message !== null && message !== void 0 ? message : '',
        "data": {
            "openId": openId !== null && openId !== void 0 ? openId : -1,
            "accessToken": accessToken !== null && accessToken !== void 0 ? accessToken : '',
            "accessTokenExpiryDate": accessTokenExpiryDate !== null && accessTokenExpiryDate !== void 0 ? accessTokenExpiryDate : '',
            "refreshToken": refreshToken !== null && refreshToken !== void 0 ? refreshToken : '',
            "refreshTokenExpiryDate": refreshTokenExpiryDate !== null && refreshTokenExpiryDate !== void 0 ? refreshTokenExpiryDate : '',
            "createDate": createDate !== null && createDate !== void 0 ? createDate : ''
        },
        "requestId": requestId !== null && requestId !== void 0 ? requestId : '',
        "success": success !== null && success !== void 0 ? success : false
    };
}
exports.default = {
    new: new_
};
