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
var _end, _kind, _name, _node, _parent, _pos;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsNode = void 0;
const ts_service_1 = require("../services/ts.service");
/**
 * The formatted tree of elements corresponding to an Abstract Syntax TsNode (AST)
 */
class TsNode {
    constructor() {
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node
        _end.set(this, undefined);
        _kind.set(this, undefined); // The kind of the node ('MethodDeclaration, IfStatement, ...)
        _name.set(this, undefined); // The name of the TsNode
        _node.set(this, undefined); // The current node in the AST
        _parent.set(this, void 0); // The tree of the parent of the current node
        _pos.set(this, undefined);
        // ---------------------------------------------------------------------------------
        //                                  Other methods
        // ---------------------------------------------------------------------------------
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get end() {
        return __classPrivateFieldGet(this, _end);
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get kind() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _kind)) !== null && _a !== void 0 ? _a : ts_service_1.Ts.getKind(this.node);
    }
    set kind(kind) {
        __classPrivateFieldSet(this, _kind, kind);
    }
    get name() {
        var _a, _b, _c, _d, _e;
        if (__classPrivateFieldGet(this, _name)) {
            return __classPrivateFieldGet(this, _name);
        }
        __classPrivateFieldSet(this, _name, (_e = (_c = (_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a['name']) === null || _b === void 0 ? void 0 : _b['escapedText']) !== null && _c !== void 0 ? _c : (_d = this.node) === null || _d === void 0 ? void 0 : _d['escapedText']) !== null && _e !== void 0 ? _e : ts_service_1.Ts.getKind(this.node));
        return __classPrivateFieldGet(this, _name);
    }
    get node() {
        return __classPrivateFieldGet(this, _node);
    }
    set node(node) {
        __classPrivateFieldSet(this, _node, node);
    }
    get parent() {
        return __classPrivateFieldGet(this, _parent);
    }
    set parent(treeNode) {
        __classPrivateFieldSet(this, _parent, treeNode);
    }
    get pos() {
        return __classPrivateFieldGet(this, _pos);
    }
    set pos(position) {
        __classPrivateFieldSet(this, _pos, position);
    }
}
exports.TsNode = TsNode;
_end = new WeakMap(), _kind = new WeakMap(), _name = new WeakMap(), _node = new WeakMap(), _parent = new WeakMap(), _pos = new WeakMap();
