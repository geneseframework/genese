"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _children, _end, _path, _text;
Object.defineProperty(exports, "__esModule", { value: true });
class AstFile {
    constructor() {
        _children.set(this, []);
        _end.set(this, 0);
        _path.set(this, '');
        _text.set(this, '');
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get children() {
        return __classPrivateFieldGet(this, _children);
    }
    set children(astNodes) {
        this.children = astNodes;
    }
    get end() {
        return __classPrivateFieldGet(this, _end);
    }
    set end(end) {
        this.end = end;
    }
    get path() {
        return __classPrivateFieldGet(this, _path);
    }
    set path(path) {
        this.path = path;
    }
    get text() {
        return __classPrivateFieldGet(this, _text);
    }
    set text(text) {
        this.text = text;
    }
}
exports.AstFile = AstFile;
_children = new WeakMap(), _end = new WeakMap(), _path = new WeakMap(), _text = new WeakMap();
