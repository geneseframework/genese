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
var tree_folder_model_1 = require("../models/tree-folder.model");
var tree_file_model_1 = require("../models/tree-file.model");
var ast_service_1 = require("./ast.service");
var evaluation_status_enum_1 = require("../enums/evaluation-status.enum");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var stats_service_1 = require("./stats.service");
var tree_method_service_1 = require("./tree-method.service");
var TreeFileService = /** @class */ (function (_super) {
    __extends(TreeFileService, _super);
    function TreeFileService(tsFile) {
        var _this = _super.call(this) || this;
        _this._stats = undefined;
        _this.tsFile = undefined;
        _this.tsFile = tsFile;
        return _this;
    }
    TreeFileService.generateTree = function (path, tsFolder) {
        if (tsFolder === void 0) { tsFolder = new tree_folder_model_1.TreeFolder(); }
        var _a;
        var tsFile = new tree_file_model_1.TreeFile();
        tsFile.sourceFile = ast_service_1.Ast.getSourceFile(path);
        tsFile.treeFolder = tsFolder;
        tsFile.name = (_a = tsFile.sourceFile) === null || _a === void 0 ? void 0 : _a.fileName;
        tsFile.treeMethods = tree_method_service_1.TreeMethodService.generateTree(tsFile);
        tsFile.evaluate();
        return tsFile;
    };
    TreeFileService.prototype.calculateStats = function (tsFile) {
        var _a, _b;
        this._stats.numberOfMethods = (_b = (_a = tsFile.treeMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (var _i = 0, _c = tsFile.treeMethods; _i < _c.length; _i++) {
            var method = _c[_i];
            this.incrementStats(method);
        }
    };
    TreeFileService.prototype.incrementStats = function (method) {
        this.incrementMethodsByStatus(method, complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.incrementMethodsByStatus(method, complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(method.cognitiveValue);
        this._stats.barChartCyclomatic.addResult(method.cyclomaticValue);
    };
    TreeFileService.prototype.incrementMethodsByStatus = function (treeMethod, type) {
        var status = (type === complexity_type_enum_1.ComplexityType.COGNITIVE) ? treeMethod.cognitiveStatus : treeMethod.cyclomaticStatus;
        switch (status) {
            case evaluation_status_enum_1.MethodStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct++;
                break;
            case evaluation_status_enum_1.MethodStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error++;
                break;
            case evaluation_status_enum_1.MethodStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning++;
                break;
            default:
                break;
        }
    };
    TreeFileService.prototype.getSubject = function () {
        this._stats.subject = this.tsFile.name;
    };
    return TreeFileService;
}(stats_service_1.StatsService));
exports.TreeFileService = TreeFileService;
