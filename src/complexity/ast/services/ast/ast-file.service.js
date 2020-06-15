"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const complexity_type_enum_1 = require("../../../enums/complexity-type.enum");
const ast_method_service_1 = require("./ast-method.service");
const ast_node_service_1 = require("./ast-node.service");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const stats_service_1 = require("../report/stats.service");
/**
 * - AstFiles generation from Abstract Syntax AstNode of a file
 * - Other services for AstFiles
 */
class AstFileService extends stats_service_1.StatsService {
    constructor() {
        super();
        this._stats = undefined; // The statistics of the AstFile
        this.astFile = undefined; // The AstFile corresponding to this service
        this.astMethodService = new ast_method_service_1.AstMethodService(); // The service managing AstMethods
        this.astNodeService = new ast_node_service_1.AstNodeService(); // The service managing AstNodes
    }
    /**
     * Sets the astMethod property to a given astNode
     * @param astNode      // The AstNode to update
     */
    setNodeMethod(astNode) {
        return astNode.isFunctionOrMethodDeclaration ? this.astMethodService.setNodeMethod(astNode) : undefined;
    }
    /**
     * Returns the array of the AstMethods corresponding to an array of AstNodes
     * @param astNodes     // The array of AstNodes
     */
    setAstMethods(astNodes) {
        const astMethods = [];
        for (const astNode of astNodes) {
            if (astNode.astMethod) {
                astMethods.push(astNode.astMethod);
            }
        }
        return astMethods;
    }
    /**
     * Sets the javascript context of each AST node
     * @param astNode      // The "parent" Node
     */
    setContextToAstNodeChildren(astNode) {
        for (const childAstNode of astNode === null || astNode === void 0 ? void 0 : astNode.children) {
            childAstNode.context = this.astNodeService.getContext(childAstNode);
            this.setContextToAstNodeChildren(childAstNode);
        }
    }
    /**
     * Calculates the statistics of the AstFile
     * @param astFile    // The AstFile to analyse
     */
    calculateStats(astFile) {
        var _a, _b;
        this._stats.numberOfMethods = (_b = (_a = astFile.astMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (const method of astFile.astMethods) {
            this.incrementStats(method);
        }
    }
    /**
     * Increments AstFile statistics for a given method
     * @param astMethod    // The AstMethod to analyse
     */
    incrementStats(astMethod) {
        this.incrementStatsMethodsByStatus(astMethod, complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(astMethod, complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(astMethod.cpxIndex);
        this._stats.barChartCyclomatic.addResult(astMethod.cyclomaticCpx);
    }
    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param astMethod        // The AstMethod to analyse
     * @param type              // The complexity type
     */
    incrementStatsMethodsByStatus(astMethod, type) {
        const status = (type === complexity_type_enum_1.ComplexityType.COGNITIVE) ? astMethod.cognitiveStatus : astMethod.cyclomaticStatus;
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
     * Adds the filename to the stats
     */
    getNameOrPath() {
        this._stats.subject = this.astFile.name;
    }
}
exports.AstFileService = AstFileService;
