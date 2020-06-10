"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const tree_method_model_1 = require("../../models/tree/tree-method.model");
const tree_node_service_1 = require("./tree-node.service");
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const ast_service_1 = require("../ast.service");
const code_service_1 = require("../code.service");
const chalk = require("chalk");
class TreeMethodService {
    constructor() {
        this.codeService = new code_service_1.CodeService();
        this.treeNodeService = new tree_node_service_1.TreeNodeService();
    }
    /**
     * Generates the array of TreeMethods corresponding to the methods included in a given TreeFile
     * @param treeFile  // The TreeFile containing the methods
     */
    generateTree(treeFile) {
        const methods = [];
        let __self = this;
        ts.forEachChild(treeFile.sourceFile, function cb(node) {
            if (ast_service_1.Ast.isFunctionOrMethod(node)) {
                const newMethod = new tree_method_model_1.TreeMethod();
                newMethod.treeFile = treeFile;
                newMethod.originalCode = __self.codeService.getNodeCode(node, treeFile.sourceFile);
                newMethod.treeNode = __self.treeNodeService.generateTree(newMethod, node);
                newMethod.createDisplayedCode();
                newMethod.treeNode.context = treeFile.treeNode;
                // newMethod.treeNode.context = __self.treeNodeService.getContext(newMethod.treeNode);
                __self.setContextToTreeNodeChildren(newMethod.treeNode);
                newMethod.evaluate();
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }
    setContextToTreeNodeChildren(treeNode) {
        var _a, _b;
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            console.log(chalk.blueBright('SEARCH CONTEXT OF '), childTreeNode.kind, childTreeNode.name);
            childTreeNode.context = this.treeNodeService.getContext(childTreeNode);
            console.log(chalk.blueBright('CONTEXT OF '), childTreeNode.kind, childTreeNode.name, ' = ', (_a = childTreeNode.context) === null || _a === void 0 ? void 0 : _a.kind, (_b = childTreeNode.context) === null || _b === void 0 ? void 0 : _b.name);
            this.setContextToTreeNodeChildren(childTreeNode);
        }
    }
    /**
     * Returns the addition of a ComplexitiesByStatus object and the complexities scores of a given treeMethod
     * @param cpxByStatus   // The object to add
     * @param treeMethod    // The TreeMethod in question
     */
    addMethodCpxByStatus(cpxByStatus, treeMethod) {
        let cpx = cpxByStatus !== null && cpxByStatus !== void 0 ? cpxByStatus : new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.COGNITIVE, treeMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.CYCLOMATIC, treeMethod.cyclomaticStatus);
        return cpx;
    }
    /**
     * For a given complexity type, returns the value of a ComplexitiesByStatus object incremented of one for a given MethodStatus
     * @param cpxByStatus       // The ComplexitiesByStatus object
     * @param complexityType    // The type of complexity to increment
     * @param methodStatus      // The complexity status
     */
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
