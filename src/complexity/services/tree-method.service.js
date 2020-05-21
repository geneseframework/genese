"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const tree_method_model_1 = require("../models/tree-method.model");
const ts_tree_service_1 = require("./ts-tree.service");
const complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
const evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
const ast_service_1 = require("./ast.service");
const code_service_1 = require("./code.service");
class TreeMethodService {
    static generateTree(treeFile) {
        const methods = [];
        ts.forEachChild(treeFile.sourceFile, function cb(node) {
            if (ast_service_1.Ast.isFunctionOrMethod(node)) {
                const newMethod = new tree_method_model_1.TreeMethod(node);
                newMethod.treeFile = treeFile;
                newMethod.astPosition = node.pos;
                const originalText = node.getFullText(treeFile.sourceFile);
                const codeService = new code_service_1.CodeService();
                newMethod.originalCode = codeService.createCode(originalText);
                newMethod.tree = ts_tree_service_1.TsTreeService.generateTree(newMethod);
                newMethod.evaluate();
                newMethod.createDisplayedCode();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }
    addMethodCpxByStatus(cpxByStatus, treeMethod) {
        let cpx = cpxByStatus !== null && cpxByStatus !== void 0 ? cpxByStatus : new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.COGNITIVE, treeMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.CYCLOMATIC, treeMethod.cyclomaticStatus);
        return cpx;
    }
    incrementMethodByCpxType(cpxByStatus, complexityType, methodStatus) {
        const status = cpxByStatus;
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
    }
}
exports.TreeMethodService = TreeMethodService;
