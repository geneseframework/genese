"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const parent_function_model_1 = require("../../models/tree/parent-function.model");
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
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            this.setParentFunction(newTree);
        });
        return treeNode;
    }
    setParentFunction(treeNode) {
        return (treeNode.isFunction) ? this.createParentFunction(treeNode) : this.getParentFunction(treeNode);
    }
    createParentFunction(treeNode) {
        const parentFunction = new parent_function_model_1.ParentFunction();
        return parentFunction.init(treeNode);
    }
    getParentFunction(treeNode) {
        if (!treeNode) {
            return undefined;
        }
        if (treeNode.isFunction) {
            return treeNode.parentFunction;
        }
        if (treeNode.parent.isFunction) {
            return treeNode.parent.parentFunction;
        }
        else {
            return this.getParentFunction(treeNode.parent);
        }
    }
    isCallback(treeNode) {
        return treeNode.isMethodIdentifier && treeNode.parentFunction.params.includes(treeNode.name);
    }
    isRecursion(treeNode) {
        var _a, _b;
        return treeNode.name === treeNode.parentFunction.name && treeNode.isMethodIdentifier && !((_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.isFunction) && !((_b = treeNode.parent) === null || _b === void 0 ? void 0 : _b.isParam);
    }
}
exports.TreeNodeService = TreeNodeService;
