"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _astFile;
Object.defineProperty(exports, "__esModule", { value: true });
const ast_file_model_1 = require("./ast-file.model");
class JsonAst {
    constructor() {
        _astFile.set(this, new ast_file_model_1.AstFile());
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astFile() {
        return __classPrivateFieldGet(this, _astFile);
    }
    set astFile(astFile) {
        console.log(astFile);
        __classPrivateFieldSet(this, _astFile, astFile);
    }
}
exports.JsonAst = JsonAst;
_astFile = new WeakMap();
