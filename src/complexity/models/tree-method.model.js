"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tree_file_model_1 = require("./tree-file.model");
var ast_service_1 = require("../services/ast.service");
var complexity_service_1 = require("../services/complexity.service");
var options_1 = require("./options");
var evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var evaluable_model_1 = require("./evaluable.model");
var TreeMethod = /** @class */ (function (_super) {
    __extends(TreeMethod, _super);
    function TreeMethod(node) {
        var _this = _super.call(this) || this;
        _this.cognitiveStatus = evaluation_status_enum_1.MethodStatus.CORRECT;
        _this.cyclomaticStatus = evaluation_status_enum_1.MethodStatus.CORRECT;
        _this.filename = '';
        _this.name = '';
        _this.node = undefined;
        _this.treeFile = new tree_file_model_1.TreeFile();
        _this.tree = undefined;
        _this.node = node;
        _this.name = ast_service_1.Ast.getMethodName(node);
        return _this;
    }
    TreeMethod.prototype.evaluate = function () {
        var _a, _b, _c;
        this.cognitiveValue = complexity_service_1.ComplexityService.calculateCognitiveComplexity(this.tree);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticValue = complexity_service_1.ComplexityService.calculateCyclomaticComplexity(this.node);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this.filename = (_c = (_b = (_a = this.treeFile) === null || _a === void 0 ? void 0 : _a.sourceFile) === null || _b === void 0 ? void 0 : _b.fileName) !== null && _c !== void 0 ? _c : '';
    };
    TreeMethod.prototype.getComplexityStatus = function (cpxType) {
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
    TreeMethod.prototype.getCode = function () {
        return this.node.getFullText(this.treeFile.sourceFile);
    };
    return TreeMethod;
}(evaluable_model_1.Evaluable));
exports.TreeMethod = TreeMethod;
