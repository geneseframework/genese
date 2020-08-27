"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFileGenerationJavaService = void 0;
const file_service_1 = require("../../../core/services/file.service");
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
const java_parser_1 = require("java-parser");
const ast_package_generation_java_service_1 = require("./ast-package-generation-java.service");
const ast_import_generation_java_service_1 = require("./ast-import-generation-java.service");
const ast_class_generation_java_service_1 = require("./ast-class-generation-java.service");
const fs = require("fs-extra");
const java_service_1 = require("./java.service");
const genese_mapper_service_1 = require("./genese-mapper.service");
/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
class AstFileGenerationJavaService {
    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param path          // The path of the file
     * @param astFolder     // The AstFolder containing the AstFile
     */
    generate(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const fileContent = fs.readFileSync(path, 'utf8');
        //mapper compilationUnit
        const compilationUnit = genese_mapper_service_1.GeneseMapperService.getMappedCompilationUnit(java_parser_1.parse(fileContent));
        return {
            name: file_service_1.getFilename(path),
            text: fileContent,
            astNode: this.createAstNodeChildren(compilationUnit)
        };
    }
    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(compilationUnit) {
        var _a, _b, _c, _d;
        let astNode;
        if ((_a = compilationUnit === null || compilationUnit === void 0 ? void 0 : compilationUnit.children) === null || _a === void 0 ? void 0 : _a.ordinaryCompilationUnit) {
            const ordinaryCompilationUnit = compilationUnit.children.ordinaryCompilationUnit[0];
            astNode = java_service_1.Java.getAstNodeWithChildren(ordinaryCompilationUnit);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.SourceFile;
            //Generate package
            if ((_b = ordinaryCompilationUnit.children) === null || _b === void 0 ? void 0 : _b.packageDeclaration) {
                new ast_package_generation_java_service_1.AstPackageGenerationJavaService().generate(ordinaryCompilationUnit.children.packageDeclaration[0], astNode);
            }
            //Generate Import nodes
            if ((_c = ordinaryCompilationUnit.children) === null || _c === void 0 ? void 0 : _c.importDeclaration) {
                new ast_import_generation_java_service_1.AstImportGenerationJavaService().generate(ordinaryCompilationUnit.children.importDeclaration, astNode);
            }
            //Generate typeDeclaration
            if ((_d = ordinaryCompilationUnit.children) === null || _d === void 0 ? void 0 : _d.typeDeclaration) {
                this.getTypeDeclaration(ordinaryCompilationUnit.children.typeDeclaration, astNode);
            }
        }
        return astNode;
    }
    /**
     *
     * @param typeDeclaration
     */
    getTypeDeclaration(typeDeclarationList, typeDeclarationAstNode) {
        typeDeclarationList.forEach(typeDeclaration => {
            var _a;
            let astNode = java_service_1.Java.getAstNodeWithChildren(typeDeclaration);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.typeIdentifier;
            //classDeclaration
            if ((_a = typeDeclaration.children) === null || _a === void 0 ? void 0 : _a.classDeclaration) {
                new ast_class_generation_java_service_1.AstClassGenerationJavaService().generate(typeDeclaration.children.classDeclaration, astNode);
            }
            typeDeclarationAstNode.children.push(astNode);
        });
        return typeDeclarationAstNode;
    }
}
exports.AstFileGenerationJavaService = AstFileGenerationJavaService;
