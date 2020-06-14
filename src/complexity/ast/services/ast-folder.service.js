"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_file_service_1 = require("../../ast/services/ast-file.service");
const ast_folder_model_1 = require("../models/ast-folder.model");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class AstFolderService {
    constructor() {
        // export class AstFolderService extends StatsService {
        this._stats = undefined; // The statistics of the AstFolder
        this.astFileAstService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
        this.astFileService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
        this.treeFolder = undefined; // The AstFolder corresponding to this service
        // super();
    }
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param jsonAst
     */
    generateAstFolders(jsonAst) {
        console.log('JSON ASTTT', jsonAst);
        jsonAst.astFolders = [];
        const paths = new Set(jsonAst.astFiles.map(e => e.path));
        paths.forEach(path => {
            jsonAst.astFolders.push(this.generateAstFolder(path));
        });
        console.log('JSON AST Astfolders', jsonAst);
        // const treeFolder: AstFolder = new AstFolder();
        // treeFolder.path = path;
        // treeFolder.relativePath = getRelativePath(Options.pathFolderToAnalyze, path);
        // const filesOrDirs = fs.readdirSync(path);
        // filesOrDirs.forEach((elementName: string) => {
        //     const pathElement = path + elementName;
        //     if (!Options.isIgnored(pathElement)) {
        //         this.generateFileOrDirTree(pathElement, language, treeSubFolder, treeFolder);
        //     }
        // });
        // treeFolder.evaluate();
        return;
    }
    generateAstFolder(path) {
        const astFolder = new ast_folder_model_1.AstFolder();
        astFolder.path = path;
        return astFolder;
    }
}
exports.AstFolderService = AstFolderService;
