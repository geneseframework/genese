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
var _node;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsNode = void 0;
/**
 * The formatted tree of elements corresponding to an Abstract Syntax TsNode (AST)
 */
class TsNode {
    constructor() {
        this.end = undefined; // The pos of the end of the source code of the TsNode in the code of its TsFile : will be injected as is in the JsonAst file
        this.kind = undefined; // The kind of the TsNode ('MethodDeclaration, IfStatement, ...) : will be injected as is in the JsonAst file
        this.name = undefined; // The name of the TsNode : will be injected as is in the JsonAst file
        _node.set(this, undefined); // The Typescript AST node of the TsNode
        this.pos = undefined; // The pos of the beginning of the AST node, including spaces and comments before it. This field will be injected as is in the JsonAst file
        this.start = undefined; // The pos of the real beginning of the AST node, without spaces and comments before it. This field will be injected as is in the JsonAst file
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node : will be used to create the children of the AstNodes in the JsonAst file
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get node() {
        return __classPrivateFieldGet(this, _node);
    }
    set node(node) {
        __classPrivateFieldSet(this, _node, node);
    }
}
exports.TsNode = TsNode;
_node = new WeakMap();
