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
var tree_folder_service_1 = require("../services/tree-folder.service");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var evaluable_model_1 = require("./evaluable.model");
var TreeFolder = /** @class */ (function (_super) {
    __extends(TreeFolder, _super);
    function TreeFolder() {
        var _this = _super.call(this) || this;
        _this.complexitiesByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        _this.numberOfFiles = 0;
        _this.numberOfMethods = 0;
        _this.parent = undefined;
        _this.path = '';
        _this.relativePath = '';
        _this.stats = undefined;
        _this.subFolders = [];
        _this.tsFiles = [];
        _this.tsFolderService = undefined;
        _this.tsFolderService = new tree_folder_service_1.TreeFolderService(_this);
        return _this;
    }
    TreeFolder.prototype.getStats = function () {
        if (!this.stats) {
            this.stats = this.tsFolderService.getStats(this).plugChartHoles();
        }
        return this.stats;
    };
    TreeFolder.prototype.evaluate = function () {
        var _a, _b;
        for (var _i = 0, _c = this.tsFiles; _i < _c.length; _i++) {
            var file = _c[_i];
            this.cognitiveValue += file.cognitiveValue;
            this.cyclomaticValue += file.cyclomaticValue;
            this.numberOfMethods += (_b = (_a = file.treeMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    };
    return TreeFolder;
}(evaluable_model_1.Evaluable));
exports.TreeFolder = TreeFolder;
