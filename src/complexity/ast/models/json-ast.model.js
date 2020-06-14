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
var _astFiles;
Object.defineProperty(exports, "__esModule", { value: true });
class JsonAst {
    constructor() {
        _astFiles.set(this, []);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astFiles() {
        return __classPrivateFieldGet(this, _astFiles);
    }
    set astFiles(astFiles) {
        __classPrivateFieldSet(this, _astFiles, astFiles !== null && astFiles !== void 0 ? astFiles : []);
    }
}
exports.JsonAst = JsonAst;
_astFiles = new WeakMap();
