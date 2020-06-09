"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const parent_function_model_1 = require("../../models/tree/parent-function.model");
const context_model_1 = require("../../models/tree/context.model");
const new_context_enum_1 = require("../../enums/new-context.enum");
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
            newTree.context = this.getNodeContext(newTree);
            // newTree.isNodeContext = this.isContext(newTree);
            console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context.kind);
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            this.setParentFunction(newTree);
        });
        return treeNode;
    }
    getNodeContext(treeNode) {
        let context;
        // console.log('NAME', treeNode.kind, treeNode.name, treeNode.isNodeContext, 'parent', treeNode.parent?.name);
        if (this.isContext(treeNode) || !treeNode.parent) {
            // console.log('CONTEXT OF', treeNode.name)
            treeNode.context = treeNode;
            context = treeNode;
        }
        else if (!ast_service_1.Ast.isIdentifier(treeNode.node)) {
            context = this.getNodeContext(treeNode.parent);
        }
        else {
            context = this.getIdentifierContext(treeNode);
        }
        // console.log('ZZZ CONTEXT OF ', treeNode.kind, treeNode.name, ' = ', context.kind);
        return context;
    }
    getIdentifierContext(treeNode) {
        var _a, _b;
        let context;
        if (ast_service_1.Ast.isPropertyAccessExpression((_b = (_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.node)) {
        }
        else {
            context = this.getNodeContext(treeNode.parent);
        }
        return context;
    }
    isContext(treeNode) {
        return Object.values(new_context_enum_1.TreeNodeContext).includes(treeNode.kind);
    }
    createContext(treeNode) {
        const context = new context_model_1.Context();
        return context.init(treeNode);
    }
    // getContext(treeNode: TreeNode): Context {
    //     if (!treeNode) {
    //         return undefined;
    //     }
    //     if (treeNode.isFunction) {
    //         return treeNode.context;
    //     }
    //     if (treeNode.parent.isFunction) {
    //         return treeNode.parent.context;
    //     } else {
    //         return this.getContext(treeNode.parent);
    //     }
    // }
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
