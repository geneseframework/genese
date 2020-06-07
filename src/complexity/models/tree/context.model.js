"use strict";
var _params;
Object.defineProperty(exports, "__esModule", { value: true });
const tree_node_model_1 = require("./tree-node.model");
class Context {
    constructor() {
        _params.set(this, undefined);
        this.treeNode = new tree_node_model_1.TreeNode();
    }
}
exports.Context = Context;
_params = new WeakMap();
