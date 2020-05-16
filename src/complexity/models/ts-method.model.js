"use strict";
exports.__esModule = true;
var ts_file_model_1 = require("./ts-file.model");
var ast_service_1 = require("../services/ast.service");
var complexity_service_1 = require("../services/complexity.service");
var options_1 = require("./options");
var evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var TsMethod = /** @class */ (function () {
    function TsMethod(node) {
        this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT;
        this.cognitiveValue = 0;
        this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT;
        this.cyclomaticValue = 0;
        this.filename = '';
        this.name = '';
        this.node = undefined;
        this.tsFile = new ts_file_model_1.TsFile();
        this.tsTree = undefined;
        this.node = node;
        this.name = ast_service_1.Ast.getMethodName(node);
    }
    TsMethod.prototype.evaluate = function () {
        var _a, _b, _c;
        this.cognitiveValue = complexity_service_1.ComplexityService.calculateCognitiveComplexity(this.tsTree);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticValue = complexity_service_1.ComplexityService.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this.filename = (_c = (_b = (_a = this.tsFile) === null || _a === void 0 ? void 0 : _a.sourceFile) === null || _b === void 0 ? void 0 : _b.fileName) !== null && _c !== void 0 ? _c : '';
    };
    TsMethod.prototype.getComplexityStatus = function (cpxType) {
        var status = evaluation_status_enum_1.MethodStatus.WARNING;
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
    };
    TsMethod.prototype.getCode = function () {
        return this.node.getFullText(this.tsFile.sourceFile);
    };
    return TsMethod;
}());
exports.TsMethod = TsMethod;
