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
        const parsedFile = java_parser_1.parse(fileContent);
        return {
            name: file_service_1.getFilename(path),
            text: fileContent,
            astNode: this.createAstNodeChildren(parsedFile)
        };
    }
    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node) {
        var _a;
        let astNode;
        const mappedNode = genese_mapper_service_1.GeneseMapperService.getMappedCompilationUnit(node);
        if ((_a = mappedNode === null || mappedNode === void 0 ? void 0 : mappedNode.children) === null || _a === void 0 ? void 0 : _a.ordinaryCompilationUnit) {
            const ordinaryCompilationUnit = node.children.ordinaryCompilationUnit[0];
            const ordinaryCompilationUnitObject = mappedNode.children.ordinaryCompilationUnit[0];
            astNode = java_service_1.Java.getAstNodeWithChildren(ordinaryCompilationUnitObject);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.SourceFile;
            //Generate package
            const packageObject = genese_mapper_service_1.GeneseMapperService.getMappedPackage(ordinaryCompilationUnit.children.packageDeclaration[0]);
            if ((packageObject === null || packageObject === void 0 ? void 0 : packageObject.name) === syntax_kind_enum_1.SyntaxKind.PackageDeclaration) {
                new ast_package_generation_java_service_1.AstPackageGenerationJavaService().generate(ordinaryCompilationUnit.children.packageDeclaration[0], astNode);
            }
            //Generate Import nodes
            const importObject = genese_mapper_service_1.GeneseMapperService.getMappedImports(ordinaryCompilationUnit.children.importDeclaration);
            if (importObject) {
                console.log('ImportDeclaration 1 ...');
                new ast_import_generation_java_service_1.AstImportGenerationJavaService().generate(ordinaryCompilationUnit.children.importDeclaration, astNode);
            }
            //Generate typeDeclaration
            if (ordinaryCompilationUnit.children.typeDeclaration) {
                this.getTypeDeclaration(ordinaryCompilationUnit.children.typeDeclaration, astNode);
            }
        }
        return astNode;
    }
    /**
     *
     * @param typeDeclaration
     */
    getTypeDeclaration(typeDeclaration, typeDeclarationAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(typeDeclaration[0]);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.typeIdentifier;
        //classDeclaration
        if (typeDeclaration[0].children.classDeclaration) {
            new ast_class_generation_java_service_1.AstClassGenerationJavaService().generate(typeDeclaration[0].children.classDeclaration, astNode);
        }
        typeDeclarationAstNode.children.push(astNode);
        return typeDeclarationAstNode;
    }
}
exports.AstFileGenerationJavaService = AstFileGenerationJavaService;
