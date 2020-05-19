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
var tree_folder_model_1 = require("./tree-folder.model");
var tree_file_service_1 = require("../services/tree-file.service");
var evaluable_model_1 = require("./evaluable.model");
var tree_method_service_1 = require("../services/tree-method.service");
/**
 * Element of the Tree structure corresponding to a given file (AST sourceFile)
 */
var TreeFile = /** @class */ (function (_super) {
    __extends(TreeFile, _super);
    function TreeFile() {
        var _this = _super.call(this) || this;
        _this.complexitiesByStatus = undefined; // The file complexities spread by complexity status
        _this.name = ''; // The name of the file
        _this.sourceFile = undefined; // The sourceFile corresponding to this TreeFile
        _this.stats = undefined; // The statistics of the file
        _this.treeFileService = undefined; // The service for TreeFiles
        _this.treeFolder = new tree_folder_model_1.TreeFolder(); // The TreeFolder which includes this TreeFile
        _this.treeMethods = []; // The TreeMethods included in this TreeFile
        _this.treeFileService = new tree_file_service_1.TreeFileService(_this);
        return _this;
    }
    /**
     * Evaluates the complexities of this TreeFile
     */
    TreeFile.prototype.evaluate = function () {
        var cpbss = new tree_method_service_1.TreeMethodService();
        for (var _i = 0, _a = this.treeMethods; _i < _a.length; _i++) {
            var method = _a[_i];
            this.cognitiveValue += method.cognitiveValue;
            this.cyclomaticValue += method.cyclomaticValue;
            this.complexitiesByStatus = cpbss.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    };
    /**
     * Gets the stats of this TreeFile
     */
    TreeFile.prototype.getStats = function () {
        if (!this.stats) {
            this.stats = this.treeFileService.getStats(this);
        }
        return this.stats;
    };
    return TreeFile;
}(evaluable_model_1.Evaluable));
exports.TreeFile = TreeFile;
