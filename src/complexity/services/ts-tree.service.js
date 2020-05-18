"use strict";
exports.__esModule = true;
var ts = require("typescript");
var ast_service_1 = require("./ast.service");
var tree_model_1 = require("../models/tree.model");
var complexity_service_1 = require("./complexity.service");
var TsTreeService = /** @class */ (function () {
    function TsTreeService() {
    }
    TsTreeService.generateTree = function (treeMethod) {
        var tsTree = new tree_model_1.Tree();
        tsTree.node = treeMethod.node;
        tsTree.depth = 0;
        tsTree.treeMethod = treeMethod;
        tsTree.kind = ast_service_1.Ast.getType(treeMethod.node);
        tsTree = TsTreeService.addTreeToChildren(tsTree);
        return tsTree;
    };
    TsTreeService.addTreeToChildren = function (tsTree) {
        var depth = tsTree.depth;
        ts.forEachChild(tsTree.node, function (childNode) {
            var newTree = new tree_model_1.Tree();
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
    };
    return TsTreeService;
}());
exports.TsTreeService = TsTreeService;
