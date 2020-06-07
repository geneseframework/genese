"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const context_model_1 = require("../../models/tree/context.model");
/**
 * Service managing TreeNodes
 */
class TreeNodeService {
    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param treeMethod    // The TreeMethod in question
     */
    generateTree(treeMethod) {
        let treeNode = new tree_node_model_1.TreeNode();
        treeNode.node = treeMethod.node;
        treeNode.nestingCpx = 0;
        treeNode.treeMethod = treeMethod;
        treeNode.kind = ast_service_1.Ast.getType(treeMethod.node);
        treeNode = this.addTreeToChildren(treeNode);
        return treeNode;
    }
    /**
     * Returns the TreeNode obtained by setting recursively TreeNodes for its children and subChildren
     * @param treeNode
     */
    addTreeToChildren(treeNode) {
        ts.forEachChild(treeNode.node, (childNode) => {
            const newTree = new tree_node_model_1.TreeNode();
            childNode.parent = treeNode.node;
            newTree.node = childNode;
            newTree.treeMethod = treeNode.treeMethod;
            newTree.parent = treeNode;
            newTree.kind = ast_service_1.Ast.getType(childNode);
            treeNode.children.push(this.addTreeToChildren(newTree));
            this.setParentFunction(newTree);
            // newTree.context = this.getContext(newTree);
            newTree.evaluate();
        });
        return treeNode;
    }
    setParentFunction(treeNode) {
        return (treeNode.isFunction) ? this.createParentFunction(treeNode) : this.getContext(treeNode);
    }
    createParentFunction(treeNode) {
        const context = new context_model_1.Context();
        context.init(treeNode);
        return context;
    }
    getContext(treeNode) {
        if (!treeNode) {
            return undefined;
        }
        if (treeNode.isFunction) {
            return treeNode.context;
        }
        if (treeNode.parent.isFunction) {
            return treeNode.parent.context;
        }
        else {
            return this.getContext(treeNode.parent);
        }
    }
    isCallback(treeNode) {
        // return false
        return treeNode.context.params.includes(treeNode.name);
    }
    isRecursion(treeNode) {
        var _a, _b;
        return treeNode.name === treeNode.context.name && treeNode.isIdentifier && !((_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.isFunction) && !((_b = treeNode.parent) === null || _b === void 0 ? void 0 : _b.isParam);
    }
}
exports.TreeNodeService = TreeNodeService;
