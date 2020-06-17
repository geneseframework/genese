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
var _tsFolder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsJsonAst = void 0;
class TsJsonAst {
    constructor() {
        _tsFolder.set(this, undefined);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get tsFolder() {
        return __classPrivateFieldGet(this, _tsFolder);
    }
    set tsFolder(tsFolder) {
        __classPrivateFieldSet(this, _tsFolder, tsFolder);
    }
    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------
    logg(message) {
        console.log('-----------------------------');
        console.log('LOG JSON_AST');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log(this.tsFolder);
    }
}
exports.TsJsonAst = TsJsonAst;
_tsFolder = new WeakMap();
