"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_folder_model_1 = require("../../models/tree/tree-folder.model");
const tree_file_model_1 = require("../../models/tree/tree-file.model");
const evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
const complexity_type_enum_1 = require("../../enums/complexity-type.enum");
const tree_node_model_1 = require("../../models/tree/tree-node.model");
const stats_service_1 = require("../../services/report/stats.service");
const tree_method_service_1 = require("../../services/tree/tree-method.service");
const tree_node_service_1 = require("../../services/tree/tree-node.service");
const ast_service_1 = require("../../services/ast.service");
/**
 * - TreeFiles generation from Abstract Syntax TreeNode of a file
 * - Other services for TreeFiles
 */
class TreeFileAstService extends stats_service_1.StatsService {
    constructor() {
        super();
        this._stats = undefined; // The statistics of the TreeFile
        this.treeFile = undefined; // The TreeFile corresponding to this service
        this.treeMethodService = new tree_method_service_1.TreeMethodService(); // The service managing TreeMethods
        this.treeNodeService = new tree_node_service_1.TreeNodeService(); // The service managing TreeNodes
    }
    static convert(jsonAst, treeFolder) {
        const treeFile = new tree_file_model_1.TreeFile();
        treeFile.sourceFile = ast_service_1.Ast.getSourceFile(jsonAst.sourceFile.path);
        treeFile.treeFolder = treeFolder;
        return treeFile;
    }
    /**
     * Generates the TreeFile for a given file of a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the file
     * @param path
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTsTree(path, treeFolder = new tree_folder_model_1.TreeFolder()) {
        var _a;
        this.treeFile = new tree_file_model_1.TreeFile();
        this.treeFile.sourceFile = ast_service_1.Ast.getSourceFile(path);
        this.treeFile.name = (_a = this.treeFile.sourceFile) === null || _a === void 0 ? void 0 : _a.fileName;
        this.treeFile.treeFolder = treeFolder;
        this.generateTreeNodes();
        this.treeFile.treeMethods = this.setTreeMethods(this.treeFile.treeNodes);
        this.treeFile.evaluate();
        return this.treeFile;
    }
    /**
     * Generates the TreeFile for a given file of a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the file
     * @param jsonAst
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTree(jsonAst, treeFolder = new tree_folder_model_1.TreeFolder()) {
        const debugJsonAst = require('../ast.json');
        console.log('JSONAST', debugJsonAst);
        this.treeFile = new tree_file_model_1.TreeFile();
        // this.treeFile.sourceFile = Ast.getSourceFile(jsonAst.sourceFile.path);
        // this.treeFile.name = this.treeFile.sourceFile?.fileName;
        // this.treeFile.treeFolder = treeFolder;
        // this.generateTreeNodes();
        // this.treeFile.treeMethods = this.setTreeMethods(this.treeFile.treeNodes);
        // this.treeFile.evaluate();
        return this.treeFile;
    }
    /**
     * Generates all the TreeNodes and updates this.treeFile
     */
    generateTreeNodes() {
        this.treeFile.treeNode = new tree_node_model_1.TreeNode();
        this.treeFile.treeNode.node = this.treeFile.sourceFile;
        this.treeFile.treeNode.treeFile = this.treeFile;
        this.treeNodeService.createTreeNodeChildren(this.treeFile.treeNode);
        this.setContextToTreeNodeChildren(this.treeFile.treeNode);
        this.treeFile.treeNodes = this.flatMapTreeNodes(this.treeFile.treeNode, [this.treeFile.treeNode]);
        for (let treeNode of this.treeFile.treeNodes) {
            treeNode = this.setNodeMethod(treeNode);
        }
    }
    /**
     * Returns an array of TreeNodes with all the TreeNode children of the first param concatenated with the second param
     * @param treeNode      // The "parent" node to parse
     * @param treeNodes     // The "accumulator"
     */
    flatMapTreeNodes(treeNode, treeNodes) {
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            treeNodes.push(childTreeNode);
            if (childTreeNode.children.length > 0) {
                treeNodes = treeNodes.concat(this.flatMapTreeNodes(childTreeNode, []));
            }
        }
        return treeNodes;
    }
    /**
     * Sets the treeMethod property to a given treeNode
     * @param treeNode      // The TreeNode to update
     */
    setNodeMethod(treeNode) {
        return treeNode.isFunctionOrMethodDeclaration ? this.treeMethodService.setNodeMethod(treeNode) : undefined;
    }
    /**
     * Returns the array of the TreeMethods corresponding to an array of TreeNodes
     * @param treeNodes     // The array of TreeNodes
     */
    setTreeMethods(treeNodes) {
        const treeMethods = [];
        for (const treeNode of treeNodes) {
            if (treeNode.treeMethod) {
                treeMethods.push(treeNode.treeMethod);
            }
        }
        return treeMethods;
    }
    /**
     * Sets the javascript context of each AST node
     * @param treeNode      // The "parent" Node
     */
    setContextToTreeNodeChildren(treeNode) {
        for (const childTreeNode of treeNode === null || treeNode === void 0 ? void 0 : treeNode.children) {
            childTreeNode.context = this.treeNodeService.getContext(childTreeNode);
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
exports.TreeFileAstService = TreeFileAstService;
