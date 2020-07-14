"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFileConversionService = void 0;
const file_service_1 = require("../../../core/services/file.service");
const ts_service_1 = require("./ts.service");
const language_to_json_ast_1 = require("../../language-to-json-ast");
const syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
/**
 * - TsFiles generation from their Abstract Syntax Tree (AST)
 */
class TsFileConversionService {
    /**
     * Generates the TsFile corresponding to a given path and a given TsFolder
     * @param path          // The path of the file
     * @param astFolder     // The TsFolder containing the TsFile
     */
    generateTsFile(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const sourceFile = language_to_json_ast_1.project.getSourceFileOrThrow(path);
        const tsFile = {
            name: file_service_1.getFilename(path),
            text: sourceFile.getFullText(),
            astNode: {
                end: undefined,
                kind: syntax_kind_enum_1.SyntaxKind.SourceFile,
                pos: 0
            }
        };
        tsFile.astNode = this.createAstNodeChildren(sourceFile);
        return tsFile;
    }
    createAstNodeChildren(node) {
        const children = [];
        node.forEachChild((childNode) => {
            children.push(this.createAstNodeChildren(childNode));
        });
        const astNode = {
            end: node.getEnd(),
            kind: ts_service_1.Ts.getKindAlias(node),
            name: ts_service_1.Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        if (ts_service_1.Ts.getType(node)) {
            astNode.type = ts_service_1.Ts.getType(node);
        }
        if (children.length > 0) {
            astNode.children = children;
        }
        return astNode;
    }
}
exports.TsFileConversionService = TsFileConversionService;
