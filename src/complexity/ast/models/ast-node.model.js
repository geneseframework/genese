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
var _children, _cpxFactors, _cyclomaticCpx, _end, _kind, _pos;
Object.defineProperty(exports, "__esModule", { value: true });
const cpx_factors_model_1 = require("../../models/cpx-factor/cpx-factors.model");
class AstNode {
    constructor() {
        _children.set(this, []);
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
        _end.set(this, 0);
        _kind.set(this, undefined);
        _pos.set(this, 0);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get children() {
        return __classPrivateFieldGet(this, _children);
    }
    set children(children) {
        __classPrivateFieldSet(this, _children, children);
    }
    get cyclomaticCpx() {
        return __classPrivateFieldGet(this, _cyclomaticCpx);
    }
    set cyclomaticCpx(cyclomaticCpx) {
        __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
    }
    get cpxFactors() {
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get end() {
        return __classPrivateFieldGet(this, _end);
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get kind() {
        return __classPrivateFieldGet(this, _kind);
    }
    set kind(kind) {
        __classPrivateFieldSet(this, _kind, kind);
    }
    get pos() {
        return __classPrivateFieldGet(this, _pos);
    }
    set pos(pos) {
        __classPrivateFieldSet(this, _pos, pos);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of the TreeNodes and the TreeMethods of this TreeFile
     */
    evaluate() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        // const treeMethodService = new TreeMethodService();
        for (const child of __classPrivateFieldGet(this, _children)) {
            child.evaluate();
        }
        // for (const method of this.treeMethods) {
        //     method.evaluate();
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        // }
    }
}
exports.AstNode = AstNode;
_children = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _end = new WeakMap(), _kind = new WeakMap(), _pos = new WeakMap();
