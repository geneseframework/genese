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
        var _a;
        let treeNode = new tree_node_model_1.TreeNode();
        treeNode.node = node;
        treeNode.nestingCpx = 0;
        treeNode.parent = (_a = treeMethod === null || treeMethod === void 0 ? void 0 : treeMethod.treeFile) === null || _a === void 0 ? void 0 : _a.treeNode;
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
            newTree.treeFile = treeNode.treeFile;
            // newTree.isNodeContext = this.mayDefineContext(newTree);
            // console.log('CONTEXT OF ', newTree.kind, newTree.name, ' = ', newTree.context?.kind);
            newTree.evaluate();
            treeNode.children.push(this.addTreeToChildren(newTree));
            // newTree.context = this.getContext(newTree);
            // this.setParentFunction(newTree);
        });
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
        var _a, _b, _c, _d, _e, _f, _g;
        let context;
        if (this.isSecondSonOfPropertyAccessExpression(treeNode)) {
            console.log(treeNode.kind, treeNode.name, 'IS SECOND SON OF', treeNode.parent.kind, (_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.name);
            context = ((_c = (_b = treeNode.parent) === null || _b === void 0 ? void 0 : _b.firstSon) === null || _c === void 0 ? void 0 : _c.mayDefineContext) ? (_d = treeNode.parent) === null || _d === void 0 ? void 0 : _d.firstSon : (_e = treeNode.parent) === null || _e === void 0 ? void 0 : _e.firstSon.context;
        }
        else {
            console.log(treeNode.kind, treeNode.name, 'HAS CONTEXT', treeNode.parent.context.kind, (_f = treeNode.parent.context) === null || _f === void 0 ? void 0 : _f.name);
            context = (_g = treeNode.parent) === null || _g === void 0 ? void 0 : _g.context;
            // context = this.getContext(treeNode.parent);
        }
        return context;
    }
    isSecondSonOfPropertyAccessExpression(treeNode) {
        var _a;
        // if (Ast.isPropertyAccessExpression(treeNode?.parent?.node) && treeNode === treeNode?.parent.secondSon) {
        //     console.log(treeNode.kind, treeNode.name, 'IS SON OF', treeNode.parent?.kind,  treeNode.parent?.name);
        // }
        return ast_service_1.Ast.isPropertyAccessExpression((_a = treeNode === null || treeNode === void 0 ? void 0 : treeNode.parent) === null || _a === void 0 ? void 0 : _a.node) && treeNode === (treeNode === null || treeNode === void 0 ? void 0 : treeNode.parent.secondSon);
    }
    getSon(treeNode, sonNumber) {
        return treeNode.children[sonNumber];
        // return Ast.getSon(treeNode?.node, treeNode?.sourceFile, sonNumber);
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
