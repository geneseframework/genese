"use strict";
exports.__esModule = true;
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var ComplexitiesByStatusService = /** @class */ (function () {
    function ComplexitiesByStatusService() {
    }
    ComplexitiesByStatusService.prototype.addMethodCpxByStatus = function (cpxByStatus, treeMethod) {
        var cpx = cpxByStatus !== null && cpxByStatus !== void 0 ? cpxByStatus : new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.COGNITIVE, treeMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.CYCLOMATIC, treeMethod.cyclomaticStatus);
        return cpx;
    };
    ComplexitiesByStatusService.prototype.incrementMethodByCpxType = function (cpxByStatus, complexityType, methodStatus) {
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
    return ComplexitiesByStatusService;
}());
exports.ComplexitiesByStatusService = ComplexitiesByStatusService;
