"use strict";
exports.__esModule = true;
var ts = require("typescript");
var ts_method_model_1 = require("../models/ts-method.model");
var ts_tree_service_1 = require("./ts-tree.service");
var TsMethodService = /** @class */ (function () {
    function TsMethodService() {
    }
    TsMethodService.generateTree = function (tsFile) {
        var methods = [];
        ts.forEachChild(tsFile.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                var newMethod = new ts_method_model_1.TsMethod(node);
                newMethod.tsFile = tsFile;
                newMethod.tsTree = ts_tree_service_1.TsTreeService.generateTree(newMethod);
                newMethod.evaluate();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    };
    return TsMethodService;
}());
exports.TsMethodService = TsMethodService;
