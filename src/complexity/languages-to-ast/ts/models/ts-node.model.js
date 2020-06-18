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
var _node, _parent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsNode = void 0;
/**
 * The formatted tree of elements corresponding to an Abstract Syntax TsNode (AST)
 */
class TsNode {
    constructor() {
        this.end = undefined;
        this.kind = undefined; // The kind of the node ('MethodDeclaration, IfStatement, ...)
        this.name = undefined; // The name of the TsNode
        _node.set(this, undefined); // The current node in the AST
        _parent.set(this, void 0); // The tree of the parent of the current node
        this.pos = undefined;
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node
        // ---------------------------------------------------------------------------------
        //                                  Other methods
        // ---------------------------------------------------------------------------------
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    // get kind(): string {
    //     return this.#kind ?? Ts.getKind(this.node);
    // }
    //
    //
    // set kind(kind: string) {
    //     this.#kind = kind;
    // }
    // get name(): string {
    //     if (this.#name) {
    //         return this.#name;
    //     }
    //     this.#name = this.node?.['name']?.['escapedText'] ?? this.node?.['escapedText'] ?? '';
    //     return this.#name;
    // }
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
}
exports.TsNode = TsNode;
_node = new WeakMap(), _parent = new WeakMap();
