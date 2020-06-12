"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_folder_service_1 = require("../../services/tree/tree-folder.service");
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const evaluable_model_1 = require("../evaluable.model");
/**
 * Element of the TreeNode structure corresponding to a given folder
 */
class TreeFolder extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.complexitiesByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus(); // The folder complexities spread by complexity status
        this.cpxIndex = 0; // The complexity index of this folder
        this.numberOfFiles = 0; // The number of files in this folder and its subfolders
        this.numberOfMethods = 0; // The number of methods included in all the files of this folder and its subfolders
        this.parent = undefined; // The TreeFolder corresponding to the parent folder of this TreeFolder
        this.path = ''; // The absolute path of this folder
        this.relativePath = ''; // The relative path of this folder
        this.stats = undefined; // The stats corresponding to this folder
        this.subFolders = []; // The subfolders of this folder
        this.treeFiles = []; // The array of files of this folder (not in the subfolders)
        this.treeFolderService = new tree_folder_service_1.TreeFolderService(); // The TreeFolderService linked to this TreeFolder
        this.treeFolderService.treeFolder = this;
    }
    /**
     * Gets the stats of this TreeFile
     */
    getStats() {
        if (!this.stats) {
            this.stats = this.treeFolderService.getStats(this);
        }
        return this.stats;
    }
    /**
     * Evaluates the complexities of the TreeFiles of this TreeFolder
     */
    evaluate() {
        var _a, _b;
        for (const file of this.treeFiles) {
            this.cpxIndex += file.cpxIndex;
            this.cyclomaticCpx += file.cyclomaticCpx;
            this.numberOfMethods += (_b = (_a = file.treeMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    }
}
exports.TreeFolder = TreeFolder;
