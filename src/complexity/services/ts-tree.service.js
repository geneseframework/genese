"use strict";
exports.__esModule = true;
var ts = require("typescript");
var ast_service_1 = require("./ast.service");
var ts_tree_model_1 = require("../models/ts-tree.model");
var complexity_service_1 = require("./complexity.service");
var TsTreeService = /** @class */ (function () {
    function TsTreeService() {
    }
    TsTreeService.generateTree = function (tsMethod) {
        var tsTree = new ts_tree_model_1.TsTree();
        tsTree.node = tsMethod.node;
        tsTree.depth = 0;
        tsTree.tsMethod = tsMethod;
        tsTree.kind = ast_service_1.Ast.getType(tsMethod.node);
        tsTree = TsTreeService.addTreeToChildren(tsTree);
        return tsTree;
    };
    TsTreeService.addTreeToChildren = function (tsTree) {
        var depth = tsTree.depth;
        ts.forEachChild(tsTree.node, function (childNode) {
            var newTree = new ts_tree_model_1.TsTree();
            childNode.parent = tsTree.node;
            newTree.node = childNode;
            newTree.depth = complexity_service_1.ComplexityService.increaseDepth(childNode, depth);
            newTree.tsMethod = tsTree.tsMethod;
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
