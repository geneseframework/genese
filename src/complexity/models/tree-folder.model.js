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
/**
 * Element of the Tree structure corresponding to a given folder
 */
var TreeFolder = /** @class */ (function (_super) {
    __extends(TreeFolder, _super);
    function TreeFolder() {
        var _this = _super.call(this) || this;
        _this.complexitiesByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus(); // The folder complexities spread by complexity status
        _this.numberOfFiles = 0; // The number of files in this folder and its subfolders
        _this.numberOfMethods = 0; // The number of methods included in all the files of this folder and its subfolders
        _this.parent = undefined; // The TreeFolder corresponding to the parent folder of this TreeFolder
        _this.path = ''; // The absolute path of this folder
        _this.relativePath = ''; // The relative path of this folder
        _this.stats = undefined; // The stats corresponding to this folder
        _this.subFolders = []; // The subfolders of this folder
        _this.tsFiles = []; // The array of files of this folder (not in the subfolders)
        _this.tsFolderService = undefined; // The TreeFolderService linked to this TreeFolder
        _this.tsFolderService = new tree_folder_service_1.TreeFolderService(_this);
        return _this;
    }
    /**
     * Gets the stats of this TreeFile
     */
    TreeFolder.prototype.getStats = function () {
        if (!this.stats) {
            this.stats = this.tsFolderService.getStats(this);
        }
        return this.stats;
    };
    /**
     * Evaluates the complexities of this TreeFolder
     */
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
