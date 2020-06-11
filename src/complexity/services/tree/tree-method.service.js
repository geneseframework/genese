"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_method_model_1 = require("../../models/tree/tree-method.model");
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const code_service_1 = require("../code.service");
class TreeMethodService {
    constructor() {
        this.codeService = new code_service_1.CodeService();
    }
    setNodeMethod(treeNode) {
        const treeMethod = new tree_method_model_1.TreeMethod();
        treeMethod.treeNode = treeNode;
        treeMethod.originalCode = this.codeService.getNodeCode(treeNode.node, treeNode.sourceFile);
        treeNode.treeMethod = treeMethod;
        return treeNode;
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
