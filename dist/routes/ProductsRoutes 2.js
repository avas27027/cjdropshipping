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
const ProductService_1 = __importDefault(require("@src/services/ProductService"));
function getCategoryList(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const catList = yield ProductService_1.default.getAllCategories();
        return res.status(HttpStatusCodes_1.default.OK).json({ catList });
    });
}
function getProductList(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prodList = yield ProductService_1.default.getProductList();
        return res.status(HttpStatusCodes_1.default.OK).json({ prodList });
    });
}
function getProductDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pid = req.params.pid;
        const prodDetail = yield ProductService_1.default.getProductDetails(pid);
        return res.status(HttpStatusCodes_1.default.OK).json({ prodDetail });
    });
}
function getProductComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pid = req.params.pid;
        const prodComment = yield ProductService_1.default.getProductComments(pid);
        return res.status(HttpStatusCodes_1.default.OK).json({ prodComment });
    });
}
exports.default = {
    getProductList,
    getCategoryList,
    getProductDetails,
    getProductComments
};
