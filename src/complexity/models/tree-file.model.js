"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_folder_model_1 = require("./tree-folder.model");
const tree_file_service_1 = require("../services/tree-file.service");
const evaluable_model_1 = require("./evaluable.model");
const tree_method_service_1 = require("../services/tree-method.service");
/**
 * Element of the Tree structure corresponding to a given file (AST sourceFile)
 */
class TreeFile extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.complexitiesByStatus = undefined; // The file complexities spread by complexity status
        this.name = ''; // The name of the file
        this.sourceFile = undefined; // The sourceFile corresponding to this TreeFile
        this.stats = undefined; // The statistics of the file
        this.treeFileService = undefined; // The service for TreeFiles
        this.treeFolder = new tree_folder_model_1.TreeFolder(); // The TreeFolder which includes this TreeFile
        this.treeMethods = []; // The TreeMethods included in this TreeFile
        this.treeFileService = new tree_file_service_1.TreeFileService(this);
    }
    /**
     * Evaluates the complexities of this TreeFile
     */
    evaluate() {
        const cpbss = new tree_method_service_1.TreeMethodService();
        for (const method of this.treeMethods) {
            this.cognitiveValue += method.cognitiveValue;
            this.cyclomaticValue += method.cyclomaticValue;
            this.complexitiesByStatus = cpbss.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    }
    /**
     * Gets the stats of this TreeFile
     */
    getStats() {
        if (!this.stats) {
            this.stats = this.treeFileService.getStats(this);
        }
        return this.stats;
    }
}
exports.TreeFile = TreeFile;
