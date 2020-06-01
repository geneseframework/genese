"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_folder_model_1 = require("../../models/tree/tree-folder.model");
const tree_file_model_1 = require("../../models/tree/tree-file.model");
const ast_service_1 = require("../ast.service");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const stats_service_1 = require("../stats.service");
const tree_method_service_1 = require("./tree-method.service");
/**
 * - TreeFiles generation from Abstract Syntax TreeNode of a file
 * - Other services for TreeFiles
 */
class TreeFileService extends stats_service_1.StatsService {
    constructor() {
        super();
        this._stats = undefined; // The statistics of the TreeFile
        this.treeFile = undefined; // The TreeFile corresponding to this service
        this.treeMethodService = new tree_method_service_1.TreeMethodService();
    }
    /**
     * Generates the TreeFile for a given file of a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the file
     * @param path          // The path of the file
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTree(path, treeFolder = new tree_folder_model_1.TreeFolder()) {
        var _a;
        const tsFile = new tree_file_model_1.TreeFile();
        tsFile.sourceFile = ast_service_1.Ast.getSourceFile(path);
        tsFile.treeFolder = treeFolder;
        tsFile.name = (_a = tsFile.sourceFile) === null || _a === void 0 ? void 0 : _a.fileName;
        tsFile.treeMethods = this.treeMethodService.generateTree(tsFile);
        tsFile.evaluate();
        return tsFile;
    }
    /**
     * Calculates the statistics of the TreeFile
     * @param treeFile    // The TreeFile to analyse
     */
    calculateStats(treeFile) {
        var _a, _b;
        this._stats.numberOfMethods = (_b = (_a = treeFile.treeMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (const method of treeFile.treeMethods) {
            this.incrementStats(method);
        }
    }
    /**
     * Increments TreeFile statistics for a given method
     * @param treeMethod    // The TreeMethod to analyse
     */
    incrementStats(treeMethod) {
        this.incrementStatsMethodsByStatus(treeMethod, complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(treeMethod, complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(treeMethod.cognitiveValue);
        this._stats.barChartCyclomatic.addResult(treeMethod.cyclomaticCpx);
    }
    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param treeMethod        // The TreeMethod to analyse
     * @param type              // The complexity type
     */
    incrementStatsMethodsByStatus(treeMethod, type) {
        const status = (type === complexity_type_enum_1.ComplexityType.COGNITIVE) ? treeMethod.cognitiveStatus : treeMethod.cyclomaticStatus;
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
    }
    /**
     * Returns the filename of the TreeFile linked to this service
     */
    getNameOrPath() {
        this._stats.subject = this.treeFile.name;
    }
}
exports.TreeFileService = TreeFileService;
