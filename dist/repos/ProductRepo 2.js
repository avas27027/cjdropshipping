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
const MockOrm_1 = __importDefault(require("./MockOrm"));
function getOne(sku) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const product of db.products) {
            if (product.productSku === sku) {
                return product;
            }
        }
        return null;
    });
}
function persists(sku) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const product of db.products) {
            if (product.productSku === sku) {
                return true;
            }
        }
        return false;
    });
}
function syncProducts(productsList) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        const now = new Date();
        const formatDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`;
        for (const newProds of productsList) {
            if (!(yield persists(newProds.productSku))) {
                yield add(newProds);
            }
        }
        for (const product of db.products) {
            if (productsList.findIndex((e) => e.productSku === product.productSku) === -1) {
                yield delete_(product.productSku);
            }
            else {
                product.syncDate = formatDate;
                yield update(product);
            }
        }
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        return db.products;
    });
}
function add(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        const now = new Date();
        product.syncDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`;
        db.products.push(product);
        return MockOrm_1.default.saveDb(db);
    });
}
function update(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.products.length; i++) {
            if (db.products[i].productSku === product.productSku) {
                db.products[i] = product;
                return MockOrm_1.default.saveDb(db);
            }
        }
    });
}
function delete_(sku) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.products.length; i++) {
            if (db.products[i].productSku === sku) {
                db.products.splice(i, 1);
                return MockOrm_1.default.saveDb(db);
            }
        }
    });
}
exports.default = {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: delete_,
    syncProducts,
};
