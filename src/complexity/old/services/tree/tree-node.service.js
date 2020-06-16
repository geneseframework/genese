"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNodeService = void 0;
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const tree_method_service_1 = require("./tree-method.service");
/**
 * Service managing TreeNodes
 */
class TreeNodeService {
    constructor() {
        this.treeMethodService = new tree_method_service_1.TreeMethodService(); // The service managing TreeMethods
    }
    /**
     * Returns the TreeNode obtained by setting recursively TreeNodes for its children and subChildren
     * @param treeNode      // The TreeNode to update
     */
    createTreeNodeChildren(treeNode) {
        ts.forEachChild(treeNode.node, (childNode) => {
            const newTree = new tree_node_model_1.TreeNode();
            childNode.parent = treeNode.node;
            newTree.node = childNode;
            newTree.treeMethod = treeNode.treeMethod;
            newTree.parent = treeNode;
            newTree.kind = ast_service_1.Ast.getKind(childNode);
            newTree.treeFile = treeNode.treeFile;
            treeNode.children.push(this.createTreeNodeChildren(newTree));
        });
        return treeNode;
    }
    /**
     * Gets the javascript context of the AST node of a TreeNode
     * @param treeNode      // The TreeNode for which we search the context
     */
    getContext(treeNode) {
        var _a, _b, _c, _d, _e;
        if (!treeNode) {
            return undefined;
        }
        switch ((_a = treeNode.node) === null || _a === void 0 ? void 0 : _a.kind) {
            case ts.SyntaxKind.SourceFile:
                return treeNode;
            case ts.SyntaxKind.Identifier:
                return this.getIdentifierContext(treeNode);
            case ts.SyntaxKind.ThisKeyword:
                return (_c = (_b = treeNode.parent) === null || _b === void 0 ? void 0 : _b.context) === null || _c === void 0 ? void 0 : _c.context;
            default:
                if ((_d = treeNode.parent) === null || _d === void 0 ? void 0 : _d.mayDefineContext) {
                    return treeNode.parent;
                }
                else {
                    return (_e = treeNode.parent) === null || _e === void 0 ? void 0 : _e.context;
                }
        }
    }
    /**
     * Gets the javascript context of an Identifier AST node of a given TreeNode
     * @param treeNode      // The concerned TreeNode
     */
    getIdentifierContext(treeNode) {
        var _a, _b, _c, _d, _e;
        if (this.isSecondSonOfPropertyAccessExpression(treeNode)) {
            return ((_b = (_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.firstSon) === null || _b === void 0 ? void 0 : _b.mayDefineContext) ? (_c = treeNode.parent) === null || _c === void 0 ? void 0 : _c.firstSon : (_d = treeNode.parent) === null || _d === void 0 ? void 0 : _d.firstSon.context;
        }
        else {
            return (_e = treeNode.parent) === null || _e === void 0 ? void 0 : _e.context;
        }
    }
    /**
     * Checks if a TreeNode is the second son of an AST node "PropertyAccessExpression"
     * (the first son is the object and the second is its property)
     * @param treeNode
     */
    isSecondSonOfPropertyAccessExpression(treeNode) {
        var _a;
        return ast_service_1.Ast.isPropertyAccessExpression((_a = treeNode === null || treeNode === void 0 ? void 0 : treeNode.parent) === null || _a === void 0 ? void 0 : _a.node) && treeNode === (treeNode === null || treeNode === void 0 ? void 0 : treeNode.parent.secondSon);
    }
    /**
     * Checks if a TreeNode is a Callback (ie a parameter which is used later in a CallExpression)
     * @param treeNode      // The TreeNode to check
     */
    isCallback(treeNode) {
        if (!treeNode.isParam) {
            return false;
        }
        return this.hasCallBack(treeNode, treeNode.parent);
    }
    /**
     * Checks if a Parameter TreeNode is used in a CallExpression of its method
     * @param treeNodeParam     // The Parameter TreeNode
     * @param treeNode          // Parameter used for recursion
     */
    hasCallBack(treeNodeParam, treeNode) {
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            if (childTreeNode.name === treeNodeParam.name && childTreeNode.context === treeNodeParam.context && childTreeNode.isCallIdentifier) {
                return true;
            }
            if (this.hasCallBack(treeNodeParam, childTreeNode)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if a TreeNode is a recursive method (ie a MethodDeclaration or a FunctionDeclaration which is called from inside)
     * @param treeNode      // The TreeNode to check
     */
    isRecursiveMethod(treeNode) {
        if (!treeNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        return this.hasRecursiveNode(treeNode.treeMethod, treeNode);
    }
    /**
     * Checks if a MethodDeclaration or a FunctionDeclaration TreeNode is called by one of its children
     * @param treeNodeMethod     // The MethodDeclaration or FunctionDeclaration TreeNode
     * @param treeNode          // Parameter used for recursion
     */
    hasRecursiveNode(treeNodeMethod, treeNode) {
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            if (childTreeNode.name === treeNodeMethod.name && childTreeNode.context === treeNodeMethod.treeNode.context && !treeNode.isFunctionOrMethodDeclaration) {
                return true;
            }
            if (this.hasRecursiveNode(treeNodeMethod, childTreeNode)) {
                return true;
            }
        }
        return false;
    }
}
exports.TreeNodeService = TreeNodeService;
