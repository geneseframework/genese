"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFileService = void 0;
const ast_file_model_1 = require("../../../ast-to-reports/models/ast/ast-file.model");
const file_service_1 = require("../../../core/services/file.service");
class TsFileService {
    generateAstFile(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const astFile = new ast_file_model_1.AstFile();
        astFile.astFolder = astFolder;
        astFile.name = file_service_1.getFilename(astFolder.path);
        astFile.logg();
        return astFile;
    }
}
exports.AstFileService = TsFileService;
