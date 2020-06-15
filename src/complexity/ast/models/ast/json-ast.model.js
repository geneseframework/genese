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
var _astFolder, _cpxFactors, _cyclomaticCpx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAst = void 0;
class JsonAst {
    constructor() {
        _astFolder.set(this, undefined);
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astFolder() {
        return __classPrivateFieldGet(this, _astFolder);
    }
    set astFolder(astFolder) {
        __classPrivateFieldSet(this, _astFolder, astFolder);
    }
    get cpxFactors() {
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get cyclomaticCpx() {
        return __classPrivateFieldGet(this, _cyclomaticCpx);
    }
    set cyclomaticCpx(cyclomaticCpx) {
        __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
    }
    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------
    evaluate() {
        this.cpxFactors = __classPrivateFieldGet(this, _astFolder).cpxFactors;
        __classPrivateFieldSet(this, _cyclomaticCpx, __classPrivateFieldGet(this, _astFolder).cyclomaticCpx);
    }
    logg(message) {
        console.log('-----------------------------');
        console.log('LOG JSON_AST');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log(this.astFolder);
    }
}
exports.JsonAst = JsonAst;
_astFolder = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap();
