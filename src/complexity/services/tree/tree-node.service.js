"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("../ast.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
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
        // console.log('TREENODE NAME', treeNode.name, 'NAME PARENT', treeNode.parent?.name)
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
            // this.getContext(newTree);
            newTree.context = this.getContext(newTree);
            newTree.evaluate();
            // console.log('CHILD KIND', newTree.kind, 'TREENODE NAME', newTree.name, 'NAME PARENT', newTree.parent?.name)
            // console.log('----KIND', treeNode.kind, 'TREENODE NAME   ', treeNode.name, 'NAME PARENT', treeNode.parent?.name)
        });
        // console.log('KIND', treeNode.kind, 'TREENODE NAMEc', treeNode.name, 'NAME PARENT', treeNode.parent?.name)
        return treeNode;
    }
    getContext(treeNode) {
        if (!treeNode) {
            return undefined;
        }
        if (treeNode.isFunction) {
            // console.log('    IS FUNCTION', treeNode.kind, 'CTXT NAME', treeNode.context.name);
            return treeNode.context;
        }
        if (treeNode.parent.isFunction) {
            // console.log('    PARENT IS FUNCTION', treeNode.kind, 'CTXT NAME', treeNode.parent.context.name);
            return treeNode.parent.context;
        }
        else {
            // console.log('    ELSE ', treeNode.kind, 'CTXT NAME', treeNode.parent.context.name);
            return this.getContext(treeNode.parent);
        }
    }
    isCallback(treeNode) {
        return false;
        // return treeNode.context.params.includes(treeNode.name);
    }
    isRecursion(treeNode) {
        var _a, _b;
        // if (treeNode.name === treeNode.context.name && !treeNode.isFunction && !treeNode.parent?.isFunction) {
        // console.log('    IS RECURSION', treeNode.name, 'PARENT NAME', treeNode.parent.name)
        // console.log('    KIND', treeNode.kind, 'NAME', treeNode.name, 'CTXT NAME', treeNode.context.name)
        // }
        // console.log('BEFORE TR NAME', treeNode.name)
        const zzz = treeNode.context;
        console.log('ZZZ NAME', treeNode.name, ' CTXT', zzz.name);
        return treeNode.name === treeNode.context.name && treeNode.isIdentifier && !((_a = treeNode.parent) === null || _a === void 0 ? void 0 : _a.isFunction) && !((_b = treeNode.parent) === null || _b === void 0 ? void 0 : _b.isParam);
        // return false
    }
}
exports.TreeNodeService = TreeNodeService;
