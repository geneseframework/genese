"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_service_1 = require("./ast.service");
const tree_model_1 = require("../models/tree.model");
const complexity_service_1 = require("./complexity.service");
class TsTreeService {
    static generateTree(treeMethod) {
        let tsTree = new tree_model_1.Tree();
        tsTree.node = treeMethod.node;
        tsTree.depth = 0;
        tsTree.treeMethod = treeMethod;
        tsTree.kind = ast_service_1.Ast.getType(treeMethod.node);
        tsTree = TsTreeService.addTreeToChildren(tsTree);
        return tsTree;
    }
    static addTreeToChildren(tsTree) {
        const depth = tsTree.depth;
        ts.forEachChild(tsTree.node, (childNode) => {
            const newTree = new tree_model_1.Tree();
            childNode.parent = tsTree.node;
            newTree.node = childNode;
            newTree.depth = complexity_service_1.ComplexityService.increaseDepth(childNode, depth);
            newTree.treeMethod = tsTree.treeMethod;
            newTree.parent = tsTree;
            newTree.kind = ast_service_1.Ast.getType(childNode);
            newTree.increasesCognitiveComplexity = complexity_service_1.ComplexityService.increasesCognitiveComplexity(newTree);
            tsTree.children.push(TsTreeService.addTreeToChildren(newTree));
        });
        return tsTree;
    }
}
exports.TsTreeService = TsTreeService;
