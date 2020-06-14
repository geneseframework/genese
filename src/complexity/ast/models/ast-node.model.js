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
var _children, _end, _kind, _pos;
Object.defineProperty(exports, "__esModule", { value: true });
class AstNode {
    constructor() {
        _children.set(this, []);
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
}
exports.AstNode = AstNode;
_children = new WeakMap(), _end = new WeakMap(), _kind = new WeakMap(), _pos = new WeakMap();
