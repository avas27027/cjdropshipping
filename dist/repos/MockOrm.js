"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jsonfile_1 = __importDefault(require("jsonfile"));
const DB_FILE_NAME = 'database.json';
function openDb() {
    if (!fs_1.default.existsSync(__dirname + '/' + DB_FILE_NAME)) {
        jsonfile_1.default.writeFile(__dirname + '/' + DB_FILE_NAME, { users: [], key: {}, products: [] });
    }
    return jsonfile_1.default.readFile(__dirname + '/' + DB_FILE_NAME);
}
function saveDb(db) {
    return jsonfile_1.default.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}
exports.default = {
    openDb,
    saveDb,
};
