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
var fs = require("fs-extra");
var tree_folder_model_1 = require("../models/tree-folder.model");
var file_service_1 = require("./file.service");
var tree_file_service_1 = require("./tree-file.service");
var barchart_service_1 = require("./barchart.service");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var stats_service_1 = require("./stats.service");
var options_1 = require("../models/options");
var TreeFolderService = /** @class */ (function (_super) {
    __extends(TreeFolderService, _super);
    function TreeFolderService(tsFolder) {
        var _this = _super.call(this) || this;
        _this._stats = undefined;
        _this.tsFolder = undefined;
        _this.tsFolder = tsFolder;
        return _this;
    }
    TreeFolderService.generateTree = function (path, extension, folder) {
        if (folder === void 0) { folder = new tree_folder_model_1.TreeFolder(); }
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        var tsFolder = new tree_folder_model_1.TreeFolder();
        tsFolder.path = path;
        tsFolder.relativePath = file_service_1.getRelativePath(options_1.Options.pathFolderToAnalyze, path);
        var filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach(function (elementName) {
            var pathElement = path + elementName;
            if (fs.statSync(pathElement).isDirectory()) {
                var subFolder = new tree_folder_model_1.TreeFolder();
                subFolder = TreeFolderService.generateTree(pathElement + "/", extension, subFolder);
                subFolder.parent = folder;
                subFolder.path = pathElement;
                tsFolder.subFolders.push(subFolder);
            }
            else {
                if (!extension || extension === file_service_1.getExtension(pathElement)) {
                    tsFolder.tsFiles.push(tree_file_service_1.TreeFileService.generateTree(pathElement, tsFolder));
                }
            }
        });
        tsFolder.evaluate();
        return tsFolder;
    };
    TreeFolderService.prototype.calculateStats = function (tsFolder) {
        var _a, _b;
        this._stats.numberOfFiles += (_b = (_a = tsFolder === null || tsFolder === void 0 ? void 0 : tsFolder.tsFiles) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (var _i = 0, _c = tsFolder.tsFiles; _i < _c.length; _i++) {
            var file = _c[_i];
            this.addFileStats(file);
        }
        for (var _d = 0, _e = tsFolder.subFolders; _d < _e.length; _d++) {
            var subFolder = _e[_d];
            this.calculateStats(subFolder);
        }
    };
    TreeFolderService.prototype.addFileStats = function (tsFile) {
        if (!tsFile) {
            return;
        }
        var tsFileStats = tsFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        this.addMethodsByStatus(complexity_type_enum_1.ComplexityType.COGNITIVE, tsFileStats);
        this.addMethodsByStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC, tsFileStats);
        this._stats.barChartCognitive = barchart_service_1.BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        this._stats.barChartCyclomatic = barchart_service_1.BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    };
    TreeFolderService.prototype.addMethodsByStatus = function (type, tsFileStats) {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    };
    TreeFolderService.prototype.getSubject = function () {
        this._stats.subject = file_service_1.getRelativePath(options_1.Options.pathCommand, this.tsFolder.path);
    };
    return TreeFolderService;
}(stats_service_1.StatsService));
exports.TreeFolderService = TreeFolderService;
