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
const ProductRepo_1 = __importDefault(require("@src/repos/ProductRepo"));
const KeyService_1 = __importDefault(require("@src/services/KeyService"));
const CJfetcher = (api, aToken, method) => __awaiter(void 0, void 0, void 0, function* () { return yield fetch(`https://developers.cjdropshipping.com/api2.0/v1/product${api}`, { method: method, headers: { 'CJ-Access-Token': aToken, "Content-Type": "application/json" } }).then((res) => res.json()); });
const Strapifetcher = () => __awaiter(void 0, void 0, void 0, function* () { return yield fetch(`https://strapi3-gm7c.onrender.com/api/product-skus`, { method: "GET" }).then((res) => res.json()); });
const delay = (ms = 2000) => new Promise(r => setTimeout(r, ms));
const syncNewProds = (skuList, key) => __awaiter(void 0, void 0, void 0, function* () {
    const productList = [];
    for (const sku of skuList) {
        yield delay();
        const newProd = yield CJfetcher(`/list?productSku=${sku}`, key, "GET");
        productList.push(newProd.data.list[0]);
    }
    yield ProductRepo_1.default.syncProducts(productList);
});
const syncNewProdsInter = (skuList, key, syncMinutes) => __awaiter(void 0, void 0, void 0, function* () {
    const firstProd = yield ProductRepo_1.default.getAll();
    const now = new Date();
    if (firstProd.length != 0) {
        const prevDate = new Date(firstProd[0].syncDate);
        const minBtw = ((now.getTime() - prevDate.getTime()) / 60000);
        if (minBtw > syncMinutes) {
            yield syncNewProds(skuList, key);
            console.log("Products are syncronize");
        }
    }
    else {
        yield syncNewProds(skuList, key);
    }
});
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        const catList = yield CJfetcher('/getCategory', key.data.accessToken, "GET");
        return catList;
    });
}
function getProductList() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        const skuResponse = yield Strapifetcher();
        const skuList = skuResponse.data.map((e) => { return e.attributes.SKU; });
        syncNewProdsInter(skuList, key.data.accessToken, 15);
        return yield ProductRepo_1.default.getAll();
    });
}
function getProductDetails(pid) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        const prodDetail = yield CJfetcher(`/query?pid=${pid}`, key.data.accessToken, "GET");
        return prodDetail;
    });
}
function getProductComments(pid) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield KeyService_1.default.getKey();
        const prodComment = yield CJfetcher(`/comments?pid=${pid}`, key.data.accessToken, "GET");
        return prodComment;
    });
}
exports.default = {
    getAllCategories,
    getProductList,
    getProductDetails,
    getProductComments
};
