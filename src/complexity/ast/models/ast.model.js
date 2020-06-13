"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _sourceFile;
Object.defineProperty(exports, "__esModule", { value: true });
class JsonAst {
    constructor() {
        _sourceFile.set(this, undefined);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get sourceFile() {
        return __classPrivateFieldGet(this, _sourceFile);
    }
    set sourceFile(astFile) {
        this.sourceFile = astFile;
    }
}
exports.JsonAst = JsonAst;
_sourceFile = new WeakMap();
