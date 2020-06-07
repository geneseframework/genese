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
var _params, _treeNode;
Object.defineProperty(exports, "__esModule", { value: true });
const tree_node_model_1 = require("./tree-node.model");
const ast_service_1 = require("../../services/ast.service");
const node_feature_enum_1 = require("../../enums/node-feature.enum");
class Context {
    constructor() {
        _params.set(this, undefined);
        _treeNode.set(this, undefined);
    }
    get isFunction() {
        return this.treeNode.feature === node_feature_enum_1.NodeFeature.FUNC;
    }
    get params() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _params)) !== null && _a !== void 0 ? _a : this.initParams();
    }
    get treeNode() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _treeNode)) !== null && _a !== void 0 ? _a : this.init().treeNode;
    }
    // set treeNode(treeNode: TreeNode) {
    //     this.#treeNode = treeNode;
    // }
    init(treeNode) {
        __classPrivateFieldSet(this, _treeNode, treeNode !== null && treeNode !== void 0 ? treeNode : new tree_node_model_1.TreeNode());
        this.initParams();
        return this;
    }
    initParams() {
        if (!this.isFunction) {
            return undefined;
        }
        __classPrivateFieldSet(this, _params, this.treeNode.children.filter(c => ast_service_1.Ast.isParam(c.node)).map(e => e.name));
        return __classPrivateFieldGet(this, _params);
    }
}
exports.Context = Context;
_params = new WeakMap(), _treeNode = new WeakMap();
