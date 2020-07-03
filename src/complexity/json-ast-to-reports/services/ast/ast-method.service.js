"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstMethodService = void 0;
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
class AstMethodService {
    /**
     * Returns the addition of a ComplexitiesByStatus object and the complexities scores of a given astMethod
     * @param cpxByStatus   // The object to add
     * @param astMethod    // The AstMethod in question
     */
    addMethodCpxByStatus(cpxByStatus, astMethod) {
        let cpx = cpxByStatus !== null && cpxByStatus !== void 0 ? cpxByStatus : new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.COGNITIVE, astMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.CYCLOMATIC, astMethod.cyclomaticStatus);
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
    static getCodeLines(astMethodNode) {
        var _a, _b, _c;
        if (!((_c = (_b = (_a = astMethodNode === null || astMethodNode === void 0 ? void 0 : astMethodNode.astFile) === null || _a === void 0 ? void 0 : _a.code) === null || _b === void 0 ? void 0 : _b.lines) === null || _c === void 0 ? void 0 : _c.length) || astMethodNode.astFile.code.lines.length < 2) {
            return [];
        }
        let firstLine = astMethodNode.astFile.code.lines.slice(astMethodNode.linePos - 1)[0];
        console.log('GET CODE LINNN', astMethodNode.kind, astMethodNode.pos, firstLine, '|');
        let codeLines = astMethodNode.astFile.code.lines.slice(astMethodNode.linePos - 1, astMethodNode.lineEnd);
        return codeLines;
    }
}
exports.AstMethodService = AstMethodService;
