"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const context_model_1 = require("../../models/tree/context.model");
const may_define_context_enum_1 = require("../../enums/may-define-context.enum");
/**
 * Service managing TreeNodes
 */
class TreeNodeService {
    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param treeMethod    // The TreeMethod in question
     * @param node
     */
    generateTree(treeMethod, node) {
        let treeNode = new tree_node_model_1.TreeNode();
        treeNode.node = node;
        treeNode.nestingCpx = 0;
        treeNode.treeMethod = treeMethod;
        treeNode.kind = ast_service_1.Ast.getType(node);
        treeNode.treeFile = treeMethod.treeFile;
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
            newTree.context = this.getContext(newTree);
            // newTree.isNodeContext = this.mayDefineContext(newTree);
            console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context.kind);
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            // this.setParentFunction(newTree);
        });
        return treeNode;
    }
    getContext(treeNode) {
        var _a, _b;
        let context;
        switch ((_a = treeNode === null || treeNode === void 0 ? void 0 : treeNode.node) === null || _a === void 0 ? void 0 : _a.kind) {
            case ts.SyntaxKind.SourceFile:
                return treeNode;
            case ts.SyntaxKind.ClassDeclaration:
                return (_b = treeNode === null || treeNode === void 0 ? void 0 : treeNode.treeFile) === null || _b === void 0 ? void 0 : _b.treeNode;
        }
        // console.log('NAME', treeNode.kind, treeNode.name, treeNode.isNodeContext, 'parent', treeNode.parent?.name);
        if (this.mayDefineContext(treeNode) || !treeNode.parent) {
            // console.log('CONTEXT OF', treeNode.name)
            treeNode.context = treeNode;
            context = treeNode;
        }
        else if (!ast_service_1.Ast.isIdentifier(treeNode.node)) {
            context = this.getContext(treeNode.parent);
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
            context = this.getContext(treeNode.parent);
        }
        return context;
    }
    mayDefineContext(treeNode) {
        return Object.values(may_define_context_enum_1.MayDefineContext).includes(treeNode.kind);
    }
    createContext(treeNode) {
        const context = new context_model_1.Context();
        return context.init(treeNode);
    }
}
exports.TreeNodeService = TreeNodeService;
