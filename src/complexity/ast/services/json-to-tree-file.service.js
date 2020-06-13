"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_file_model_1 = require("../../models/tree/tree-file.model");
const ast_service_1 = require("../../services/ast.service");
class JsonToTreeFileService {
    static convert(jsonAst, treeFolder) {
        const treeFile = new tree_file_model_1.TreeFile();
        treeFile.sourceFile = ast_service_1.Ast.getSourceFile(jsonAst.sourceFile.path);
        treeFile.treeFolder = treeFolder;
        return treeFile;
    }
}
exports.JsonToTreeFileService = JsonToTreeFileService;
