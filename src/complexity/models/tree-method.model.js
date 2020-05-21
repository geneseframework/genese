"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_file_model_1 = require("./tree-file.model");
const ast_service_1 = require("../services/ast.service");
const complexity_service_1 = require("../services/complexity.service");
const options_1 = require("./options");
const evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
const evaluable_model_1 = require("./evaluable.model");
/**
 * Element of the Tree structure corresponding to a given method
 */
class TreeMethod extends evaluable_model_1.Evaluable {
    constructor(node) {
        super();
        this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cognitive status of the method
        this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT; // The cyclomatic status of the method
        this.filename = ''; // The name of the file containing the method
        this.name = ''; // The name of the method
        this.node = undefined; // The AST node corresponding to the method
        this.treeFile = new tree_file_model_1.TreeFile(); // The TreeFile which contains the TreeMethod
        this.tree = undefined; // The AST of the method itself
        this.node = node;
        this.name = ast_service_1.Ast.getMethodName(node);
    }
    /**
     * Evaluates the complexities of this TreeMethod
     */
    evaluate() {
        var _a, _b, _c;
        this.cognitiveValue = complexity_service_1.ComplexityService.getCognitiveComplexity(this.tree);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticValue = complexity_service_1.ComplexityService.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this.filename = (_c = (_b = (_a = this.treeFile) === null || _a === void 0 ? void 0 : _a.sourceFile) === null || _b === void 0 ? void 0 : _b.fileName) !== null && _c !== void 0 ? _c : '';
    }
    /**
     * Get the complexity status of the method for a given complexity type
     * @param cpxType
     */
    getComplexityStatus(cpxType) {
        let status = evaluation_status_enum_1.MethodStatus.WARNING;
        if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cognitiveValue <= options_1.Options.cognitiveCpx.warningThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticValue <= options_1.Options.cyclomaticCpx.warningThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.CORRECT;
        }
        else if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cognitiveValue > options_1.Options.cognitiveCpx.errorThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticValue > options_1.Options.cyclomaticCpx.errorThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.ERROR;
        }
        return status;
    }
    /**
     * Gets the full code of the method
     */
    getCode() {
        return this.node.getFullText(this.treeFile.sourceFile);
    }
}
exports.TreeMethod = TreeMethod;
