"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFileService = void 0;
const ast_file_model_1 = require("../../../core/models/ast/ast-file.model");
class AstFileService {
    generateAstFile(path, astFolder) {
        const astFile = new ast_file_model_1.AstFile();
        astFile.astFolder = astFolder;
        return astFile;
    }
}
exports.AstFileService = AstFileService;
