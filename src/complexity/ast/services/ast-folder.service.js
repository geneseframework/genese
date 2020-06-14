"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_file_service_1 = require("../../ast/services/ast-file.service");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class AstFolderService {
    constructor() {
        // export class AstFolderService extends StatsService {
        this._stats = undefined; // The statistics of the TreeFolder
        this.astFileAstService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
        this.astFileService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
        this.treeFolder = undefined; // The TreeFolder corresponding to this service
        // super();
    }
    /**
     * Generates the TreeFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     * @param language         // The extension of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The TreeFolder of a subfolder (param useful only for recursivity, should not be used outside of the method)
     */
    generateAstFolders(jsonAst) {
        console.log('JSON ASTTT', jsonAst);
        // const treeFolder: TreeFolder = new TreeFolder();
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
}
exports.AstFolderService = AstFolderService;
