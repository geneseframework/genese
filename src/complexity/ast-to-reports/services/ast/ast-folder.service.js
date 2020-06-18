"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFolderService = void 0;
const stats_service_1 = require("../report/stats.service");
const stats_model_1 = require("../../models/stats.model");
const ast_file_service_1 = require("./ast-file.service");
/**
 * - AstFolders generation from Abstract Syntax AstNode of a folder
 * - Other services for AstFolders
 */
class AstFolderService extends stats_service_1.StatsService {
    constructor() {
        super();
        this._stats = undefined; // The statistics of the AstFolder
        this.astFileService = new ast_file_service_1.AstFileService(); // The service managing AstFiles
        this.astFolder = undefined; // The AstFolder corresponding to this service
    }
    /**
     * Calculates the statistics of the AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    calculateStats(astFolder) {
        var _a, _b;
        this._stats = new stats_model_1.Stats();
        this._stats.numberOfFiles += (_b = (_a = astFolder === null || astFolder === void 0 ? void 0 : astFolder.astFiles) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (const file of astFolder.astFiles) {
            this.incrementFileStats(file);
        }
        for (const subFolder of astFolder.children) {
            this.calculateStats(subFolder);
        }
        return this._stats;
    }
    /**
     * Increments AstFolder statistics for a given astFile
     * @param astFile       // The AstFile to analyse
     */
    incrementFileStats(astFile) {
        if (!astFile) {
            return;
        }
        let tsFileStats = astFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        // this.incrementMethodsByStatus(ComplexityType.COGNITIVE, tsFileStats);
        // this.incrementMethodsByStatus(ComplexityType.CYCLOMATIC, tsFileStats);
        // this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        // this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
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
     * Returns the path of the AstFolder linked to this service
     */
    getNameOrPath(astFolder) {
        // this._stats.subject = getRelativePath(Options.pathCommand, astFolder.path);
    }
    getAstFolderRoot(astFolder) {
        if (!(astFolder === null || astFolder === void 0 ? void 0 : astFolder.parent)) {
            return astFolder;
        }
        return this.getAstFolderRoot(astFolder.parent);
    }
    getRootPath(astFolder) {
        var _a;
        return (_a = this.getAstFolderRoot(astFolder)) === null || _a === void 0 ? void 0 : _a.path;
    }
    getRelativePath(astFolder) {
        var _a;
        return (_a = astFolder === null || astFolder === void 0 ? void 0 : astFolder.path) === null || _a === void 0 ? void 0 : _a.slice(this.getRootPath(astFolder).length);
    }
    /**
     * Returns the path between a AstFolder's path and a AstFile's path which is inside it or inside one of its subfolders
     * @param astFolder      // The path of the AstFolder
     * @param astFile        // The path of the AstFile
     */
    getRouteFromFolderToFile(astFolder, astFile) {
        var _a;
        if (!astFile || !astFolder) {
            return undefined;
        }
        console.log('ASTFOLDERPATHHH', astFile.name, (_a = astFolder.parent) === null || _a === void 0 ? void 0 : _a.path, astFolder.path);
        if (astFile.astFolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The file ${astFile.name} is not inside the folder ${astFolder.path}`);
            return undefined;
        }
        else {
            return;
            // const linkStarter = astFolder.relativePath === '' ? './' : '.';
            // return `${linkStarter}${astFile.astFolder.path.slice(astFolder.path.length)}`;
        }
    }
    /**
     * Returns the route from the folder of a AstFolder to one of its subfolders
     * @param astFolder
     * @param astSubfolder
     */
    getRouteFromFolderToSubFolder(astFolder, astSubfolder) {
        if (!astFolder || !astSubfolder || astSubfolder.path === astFolder.path) {
            return undefined;
        }
        if (astSubfolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The folder ${astSubfolder.path} is not a subfolder of ${astFolder.path}`);
            return undefined;
        }
        else {
            return;
            // const linkStarter = astFolder.relativePath === '' ? './' : '.';
            // return `${linkStarter}${astSubfolder.path.slice(astFolder.path.length)}`;
        }
    }
}
exports.AstFolderService = AstFolderService;
