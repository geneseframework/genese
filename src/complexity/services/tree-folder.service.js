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
/**
 * - TreeFolders generation from Abstract Syntax Tree of a folder
 * - Other services for TreeFolders
 */
var TreeFolderService = /** @class */ (function (_super) {
    __extends(TreeFolderService, _super);
    function TreeFolderService(treeFolder) {
        var _this = _super.call(this) || this;
        _this._stats = undefined; // The statistics of the TreeFolder
        _this.treeFolder = undefined; // The TreeFolder corresponding to this service
        _this.treeFolder = treeFolder;
        return _this;
    }
    /**
     * Generates the TreeFolder for a given folder
     * The tree is generated according to the Abstract Syntax Tree (AST) of the folder
     * @param path              // The path of the folder
     * @param extension         // The extension of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The TreeFolder of a subfolder (param useful only for recursivity, should not be used outside of the method)
     */
    TreeFolderService.generateTree = function (path, extension, treeSubFolder) {
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
                subFolder.parent = treeSubFolder;
                subFolder.path = pathElement;
                tsFolder.subFolders.push(subFolder);
            }
            else {
                if (!extension || extension === file_service_1.getExtension(pathElement)) {
                    tsFolder.treeFiles.push(tree_file_service_1.TreeFileService.generateTree(pathElement, tsFolder));
                }
            }
        });
        tsFolder.evaluate();
        return tsFolder;
    };
    /**
     * Calculates the statistics of the TreeFolder
     * @param treeFolder        // The TreeFolder to analyse
     */
    TreeFolderService.prototype.calculateStats = function (treeFolder) {
        var _a, _b;
        this._stats.numberOfFiles += (_b = (_a = treeFolder === null || treeFolder === void 0 ? void 0 : treeFolder.treeFiles) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (var _i = 0, _c = treeFolder.treeFiles; _i < _c.length; _i++) {
            var file = _c[_i];
            this.incrementFileStats(file);
        }
        for (var _d = 0, _e = treeFolder.subFolders; _d < _e.length; _d++) {
            var subFolder = _e[_d];
            this.calculateStats(subFolder);
        }
    };
    /**
     * Increments TreeFolder statistics for a given treeFile
     * @param treeFile       // The TreeFile to analyse
     */
    TreeFolderService.prototype.incrementFileStats = function (treeFile) {
        if (!treeFile) {
            return;
        }
        var tsFileStats = treeFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        this.incrementMethodsByStatus(complexity_type_enum_1.ComplexityType.COGNITIVE, tsFileStats);
        this.incrementMethodsByStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC, tsFileStats);
        this._stats.barChartCognitive = barchart_service_1.BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        this._stats.barChartCyclomatic = barchart_service_1.BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    };
    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    TreeFolderService.prototype.incrementMethodsByStatus = function (type, tsFileStats) {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    };
    /**
     * Returns the path of the TreeFolder linked to this service
     */
    TreeFolderService.prototype.getNameOrPath = function () {
        this._stats.subject = file_service_1.getRelativePath(options_1.Options.pathCommand, this.treeFolder.path);
    };
    /**
     * Returns the path between a TreeFolder's path and a TreeFile's path which is inside it or inside one of its subfolders
     * @param treeFolder      // The path of the TreeFolder
     * @param treeFile        // The path of the TreeFile
     */
    TreeFolderService.prototype.getRouteFromFolderToFile = function (treeFolder, treeFile) {
        if (!treeFile || !treeFolder) {
            return undefined;
        }
        if (treeFile.treeFolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
            console.log("The file " + treeFile.name + " is not inside the folder " + treeFolder.path);
            return undefined;
        }
        else {
            var linkStarter = treeFolder.relativePath === '' ? './' : '.';
            return "" + linkStarter + treeFile.treeFolder.path.slice(treeFolder.path.length);
        }
    };
    /**
     * Returns the route from the folder of a TreeFolder to one of its subfolders
     * @param treeFolder
     * @param treeSubfolder
     */
    TreeFolderService.prototype.getRouteFromFolderToSubFolder = function (treeFolder, treeSubfolder) {
        if (!treeFolder || !treeSubfolder || treeSubfolder.path === treeFolder.path) {
            return undefined;
        }
        if (treeSubfolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
            console.log("The folder " + treeSubfolder.path + " is not a subfolder of " + treeFolder.path);
            return undefined;
        }
        else {
            var linkStarter = treeFolder.relativePath === '' ? './' : '.';
            return "" + linkStarter + treeSubfolder.path.slice(treeFolder.path.length);
        }
    };
    return TreeFolderService;
}(stats_service_1.StatsService));
exports.TreeFolderService = TreeFolderService;
