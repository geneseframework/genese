"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const tree_folder_model_1 = require("../models/tree-folder.model");
const file_service_1 = require("./file.service");
const tree_file_service_1 = require("./tree-file.service");
const barchart_service_1 = require("./barchart.service");
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
const stats_service_1 = require("./stats.service");
const options_1 = require("../models/options");
/**
 * - TreeFolders generation from Abstract Syntax Tree of a folder
 * - Other services for TreeFolders
 */
class TreeFolderService extends stats_service_1.StatsService {
    constructor(treeFolder) {
        super();
        this._stats = undefined; // The statistics of the TreeFolder
        this.treeFolder = undefined; // The TreeFolder corresponding to this service
        this.treeFolder = treeFolder;
    }
    /**
     * Generates the TreeFolder for a given folder
     * The tree is generated according to the Abstract Syntax Tree (AST) of the folder
     * @param path              // The path of the folder
     * @param extension         // The extension of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The TreeFolder of a subfolder (param useful only for recursivity, should not be used outside of the method)
     */
    static generateTree(path, extension, treeSubFolder) {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        const tsFolder = new tree_folder_model_1.TreeFolder();
        tsFolder.path = path;
        tsFolder.relativePath = file_service_1.getRelativePath(options_1.Options.pathFolderToAnalyze, path);
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach(function (elementName) {
            const pathElement = path + elementName;
            if (!TreeFolderService.isIgnored(pathElement)) {
                if (fs.statSync(pathElement).isDirectory()) {
                    let subFolder = new tree_folder_model_1.TreeFolder();
                    subFolder = TreeFolderService.generateTree(`${pathElement}/`, extension, subFolder);
                    subFolder.parent = treeSubFolder;
                    subFolder.path = pathElement;
                    tsFolder.subFolders.push(subFolder);
                }
                else {
                    if (!extension || extension === file_service_1.getExtension(pathElement)) {
                        tsFolder.treeFiles.push(tree_file_service_1.TreeFileService.generateTree(pathElement, tsFolder));
                    }
                }
            }
        });
        tsFolder.evaluate();
        return tsFolder;
    }
    static isIgnored(path) {
        return options_1.Options.ignore.includes(path);
    }
    /**
     * Calculates the statistics of the TreeFolder
     * @param treeFolder        // The TreeFolder to analyse
     */
    calculateStats(treeFolder) {
        var _a, _b;
        this._stats.numberOfFiles += (_b = (_a = treeFolder === null || treeFolder === void 0 ? void 0 : treeFolder.treeFiles) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (const file of treeFolder.treeFiles) {
            this.incrementFileStats(file);
        }
        for (const subFolder of treeFolder.subFolders) {
            this.calculateStats(subFolder);
        }
    }
    /**
     * Increments TreeFolder statistics for a given treeFile
     * @param treeFile       // The TreeFile to analyse
     */
    incrementFileStats(treeFile) {
        if (!treeFile) {
            return;
        }
        let tsFileStats = treeFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        this.incrementMethodsByStatus(complexity_type_enum_1.ComplexityType.COGNITIVE, tsFileStats);
        this.incrementMethodsByStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC, tsFileStats);
        this._stats.barChartCognitive = barchart_service_1.BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        this._stats.barChartCyclomatic = barchart_service_1.BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    }
    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    incrementMethodsByStatus(type, tsFileStats) {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    }
    /**
     * Returns the path of the TreeFolder linked to this service
     */
    getNameOrPath() {
        this._stats.subject = file_service_1.getRelativePath(options_1.Options.pathCommand, this.treeFolder.path);
    }
    /**
     * Returns the path between a TreeFolder's path and a TreeFile's path which is inside it or inside one of its subfolders
     * @param treeFolder      // The path of the TreeFolder
     * @param treeFile        // The path of the TreeFile
     */
    getRouteFromFolderToFile(treeFolder, treeFile) {
        if (!treeFile || !treeFolder) {
            return undefined;
        }
        if (treeFile.treeFolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
            console.log(`The file ${treeFile.name} is not inside the folder ${treeFolder.path}`);
            return undefined;
        }
        else {
            const linkStarter = treeFolder.relativePath === '' ? './' : '.';
            return `${linkStarter}${treeFile.treeFolder.path.slice(treeFolder.path.length)}`;
        }
    }
    /**
     * Returns the route from the folder of a TreeFolder to one of its subfolders
     * @param treeFolder
     * @param treeSubfolder
     */
    getRouteFromFolderToSubFolder(treeFolder, treeSubfolder) {
        if (!treeFolder || !treeSubfolder || treeSubfolder.path === treeFolder.path) {
            return undefined;
        }
        if (treeSubfolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
            console.log(`The folder ${treeSubfolder.path} is not a subfolder of ${treeFolder.path}`);
            return undefined;
        }
        else {
            const linkStarter = treeFolder.relativePath === '' ? './' : '.';
            return `${linkStarter}${treeSubfolder.path.slice(treeFolder.path.length)}`;
        }
    }
}
exports.TreeFolderService = TreeFolderService;
