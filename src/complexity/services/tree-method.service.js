"use strict";
exports.__esModule = true;
var ts = require("typescript");
var tree_method_model_1 = require("../models/tree-method.model");
var ts_tree_service_1 = require("./ts-tree.service");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
var TreeMethodService = /** @class */ (function () {
    function TreeMethodService() {
    }
    TreeMethodService.generateTree = function (tsFile) {
        var methods = [];
        ts.forEachChild(tsFile.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                var newMethod = new tree_method_model_1.TreeMethod(node);
                newMethod.treeFile = tsFile;
                newMethod.tree = ts_tree_service_1.TsTreeService.generateTree(newMethod);
                newMethod.evaluate();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    };
    TreeMethodService.prototype.addMethodCpxByStatus = function (cpxByStatus, treeMethod) {
        var cpx = cpxByStatus !== null && cpxByStatus !== void 0 ? cpxByStatus : new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.COGNITIVE, treeMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.CYCLOMATIC, treeMethod.cyclomaticStatus);
        return cpx;
    };
    TreeMethodService.prototype.incrementMethodByCpxType = function (cpxByStatus, complexityType, methodStatus) {
        var status = cpxByStatus;
        switch (methodStatus) {
            case evaluation_status_enum_1.MethodStatus.CORRECT:
                status[complexityType].correct = status[complexityType].correct + 1;
                break;
            case evaluation_status_enum_1.MethodStatus.WARNING:
                status[complexityType].warning++;
                break;
            case evaluation_status_enum_1.MethodStatus.ERROR:
                status[complexityType].error++;
                break;
            default:
                break;
        }
        return status;
    };
    return TreeMethodService;
}());
exports.TreeMethodService = TreeMethodService;
