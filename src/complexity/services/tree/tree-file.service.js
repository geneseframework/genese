"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_folder_model_1 = require("../../models/tree/tree-folder.model");
const tree_file_model_1 = require("../../models/tree/tree-file.model");
const ast_service_1 = require("../ast.service");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const stats_service_1 = require("../report/stats.service");
const tree_method_service_1 = require("./tree-method.service");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const tree_node_service_1 = require("./tree-node.service");
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
        this.treeNodeService = new tree_node_service_1.TreeNodeService();
    }
    /**
     * Generates the TreeFile for a given file of a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the file
     * @param path          // The path of the file
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTree(path, treeFolder = new tree_folder_model_1.TreeFolder()) {
        var _a;
        let treeFile = new tree_file_model_1.TreeFile();
        treeFile.sourceFile = ast_service_1.Ast.getSourceFile(path);
        treeFile.name = (_a = treeFile.sourceFile) === null || _a === void 0 ? void 0 : _a.fileName;
        treeFile.treeNode = new tree_node_model_1.TreeNode();
        treeFile.treeNode.node = treeFile.sourceFile;
        treeFile.treeNode.treeFile = treeFile;
        treeFile.treeFolder = treeFolder;
        this.treeNodeService.createTreeNodeChildren(treeFile.treeNode);
        this.setContextToTreeNodeChildren(treeFile.treeNode);
        treeFile.treeNodes = this.setTreeNodes(treeFile.treeNode, [treeFile.treeNode]);
        for (let treeNode of treeFile.treeNodes) {
            treeNode = this.setNodeMethod(treeNode);
        }
        treeFile.treeMethods = this.initTreeMethods(treeFile.treeNodes);
        console.log('METHODSSSS', treeFile.treeMethods);
        // treeFile.treeMethods = this.treeMethodService.createTreeMethods(treeFile.treeNode);
        treeFile.evaluate();
        return treeFile;
    }
    setTreeNodes(treeNode, treeNodes) {
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            treeNodes.push(childTreeNode);
            if (childTreeNode.children.length > 0) {
                treeNodes = treeNodes.concat(this.setTreeNodes(childTreeNode, []));
            }
        }
        return treeNodes;
    }
    setNodeMethod(treeNode) {
        return treeNode.isFunctionOrMethodDeclaration ? this.treeMethodService.setNodeMethod(treeNode) : undefined;
    }
    initTreeMethods(treeNodes) {
        const treeMethods = [];
        for (const treeNode of treeNodes) {
            if (treeNode.treeMethod) {
                treeMethods.push(treeNode.treeMethod);
            }
        }
        return treeMethods;
    }
    setContextToTreeNodeChildren(treeNode) {
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            childTreeNode.context = this.treeNodeService.getContext(childTreeNode);
            // childTreeNode.treeMethod = new TreeMethod();
            // console.log(chalk.blueBright('CONTEXT OF '), childTreeNode.kind, childTreeNode.name, ' = ', childTreeNode.context?.kind,  childTreeNode.context?.name);
            this.setContextToTreeNodeChildren(childTreeNode);
        }
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
        this._stats.barChartCognitive.addResult(treeMethod.cpxIndex);
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
     * Adds the filename to the stats
     */
    getNameOrPath() {
        this._stats.subject = this.treeFile.name;
    }
}
exports.TreeFileService = TreeFileService;
