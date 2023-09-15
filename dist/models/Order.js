"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isOrder(arg) {
    return (!!arg &&
        typeof arg === 'object' &&
        'orderNumber' in arg &&
        'shippingZip' in arg &&
        'shippingCountryCode' in arg &&
        'shippingCountry' in arg &&
        'shippingProvince' in arg &&
        'shippingCity' in arg &&
        'shippingAddress' in arg &&
        'shippingPhone' in arg &&
        'remark' in arg &&
        'fromCountryCode' in arg &&
        'logisticName' in arg &&
        'products' in arg);
}
exports.default = {
    isOrder
};
