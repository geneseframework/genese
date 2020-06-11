"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const may_define_context_enum_1 = require("../../enums/may-define-context.enum");
const tree_method_service_1 = require("./tree-method.service");
/**
 * Service managing TreeNodes
 */
class TreeNodeService {
    constructor() {
        this.treeMethodService = new tree_method_service_1.TreeMethodService();
    }
    /**
     * Generates the TreeNode corresponding to a given TreeMethod
     * @param parentTreeNode
     * @param node
     */
    // generateTree(parentTreeNode: TreeNode, node: ts.Node): TreeNode {
    //     let treeNode: TreeNode = new TreeNode();
    //     treeNode.node = node;
    //     treeNode.nestingCpx = 0;
    //     treeNode.parent = parentTreeNode;
    //     treeNode.treeMethod = Ast.isMethodDeclaration(node) ? this.treeMethodService.generateTree(treeNode) : parentTreeNode.treeMethod;
    //     // treeNode.kind = Ast.getKind(node);
    //     treeNode.treeFile = parentTreeNode?.treeFile;
    //     treeNode = this.createTreeNodeChildren(treeNode);
    //     return treeNode;
    // }
    // generateTree(treeMethod: TreeMethod, node: ts.Node): TreeNode {
    //     let treeNode: TreeNode = new TreeNode();
    //     treeNode.node = node;
    //     treeNode.nestingCpx = 0;
    //     treeNode.parent = treeMethod?.treeFile?.treeNode;
    //     treeNode.treeMethod = treeMethod;
    //     treeNode.kind = Ast.getKind(node);
    //     treeNode.treeFile = treeMethod.treeFile;
    //     treeNode = this.createTreeNodeChildren(treeNode);
    //     return treeNode;
    // }
    /**
     * Returns the TreeNode obtained by setting recursively TreeNodes for its children and subChildren
     * @param treeNode
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
            // newTree.isNodeContext = this.mayDefineContext(newTree);
            // console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context?.kind);
            // treeNode.treeMethod = Ast.isMethodDeclaration(treeNode.node) ? this.treeMethodService.generatefTree(treeNode) : treeNode.treeMethod;
            treeNode.children.push(this.createTreeNodeChildren(newTree));
            newTree.evaluate();
            // newTree.context = this.getContext(newTree);
            // this.setParentFunction(newTree);
        });
        // console.log('CHILDRENNN', treeNode.kind, treeNode.children.length)
        return treeNode;
    }
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
                    // return this.getContext(treeNode.parent);
                }
        }
    }
    getIdentifierContext(treeNode) {
        var _a, _b, _c, _d, _e;
        if (this.isSecondSonOfPropertyAccessExpression(treeNode)) {
            return ((_b = (_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.firstSon) === null || _b === void 0 ? void 0 : _b.mayDefineContext) ? (_c = treeNode.parent) === null || _c === void 0 ? void 0 : _c.firstSon : (_d = treeNode.parent) === null || _d === void 0 ? void 0 : _d.firstSon.context;
        }
        else {
            return (_e = treeNode.parent) === null || _e === void 0 ? void 0 : _e.context;
        }
    }
    isSecondSonOfPropertyAccessExpression(treeNode) {
        var _a;
        return ast_service_1.Ast.isPropertyAccessExpression((_a = treeNode === null || treeNode === void 0 ? void 0 : treeNode.parent) === null || _a === void 0 ? void 0 : _a.node) && treeNode === (treeNode === null || treeNode === void 0 ? void 0 : treeNode.parent.secondSon);
    }
    getSon(treeNode, sonNumber) {
        return treeNode.children[sonNumber];
    }
    mayDefineContext(treeNode) {
        return Object.values(may_define_context_enum_1.MayDefineContext).includes(treeNode.kind);
    }
    // isCallback(treeNode: TreeNode): boolean {
    //     return treeNode.isMethodIdentifier && treeNode.parentFunction.params.includes(treeNode.name);
    // }
    //
    //
    isRecursiveMethod(treeNode) {
        if (!treeNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        console.log('TRMTHD', treeNode.treeMethod);
        return this.hasRecursiveNode(treeNode.treeMethod, treeNode);
    }
    hasRecursiveNode(treeNodeMethod, treeNode) {
        console.log('HAS RECURSIVE ? ', treeNode.kind);
        // for (const childTreeNode of treeNode?.children) {
        //     console.log('METHOF', treeNodeMethod.name, 'NODE', treeNode.name)
        //     if (childTreeNode.name === treeNodeMethod.name && treeNode.context === treeNodeMethod.treeNode.context) {
        //         console.log('RETURN TRUE 1')
        //         return true;
        //     }
        //     if (this.hasRecursiveNode(treeNodeMethod, childTreeNode)) {
        //         console.log('RETURN TRUE 2')
        //         return true;
        //     }
        // }
        console.log('RETURN FALSE');
        return false;
    }
}
exports.TreeNodeService = TreeNodeService;
