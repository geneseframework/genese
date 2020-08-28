"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstImportGenerationJavaService = void 0;
const java_service_1 = require("./java.service");
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
/**
 * - Generate AstNode for imports from their Abstract Syntax Tree (AST)
 */
class AstImportGenerationJavaService {
    /**
     * Gets the package Node
     * @param node // AST Node
     */
    generate(importDeclarationList, importAstNodes) {
        importDeclarationList.forEach(importDeclaration => {
            let astNode = java_service_1.JavaService.getAstNodeWithChildren(importDeclaration);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.importDeclaration;
            this.generateImportChildren(importDeclaration.children, importAstNodes);
            importAstNodes.children.push(astNode);
        });
        return importAstNodes;
    }
    /**
     * @param  {ImportChildren} importChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateImportChildren(importChildren, astNode) {
        if (importChildren) {
            java_service_1.JavaService.getAstNodeInfos(importChildren.Import, astNode);
            this.generatePackageOrTypeName(importChildren.packageOrTypeName[0], astNode);
            java_service_1.JavaService.getAstNodeInfos(importChildren.Semicolon, astNode);
        }
    }
    /**
     * @param  {PackageOrTypeName} packageOrTypeName
     * @param  {} packageOrTypeNameAstNode
     */
    generatePackageOrTypeName(packageOrTypeName, packageOrTypeNameAstNode) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(packageOrTypeName);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.packageOrTypeName;
        if (packageOrTypeName.children.Identifier) {
            java_service_1.JavaService.getAstNodeInfos(packageOrTypeName.children.Identifier, astNode);
        }
        packageOrTypeNameAstNode.children.push(astNode);
        return packageOrTypeNameAstNode;
    }
}
exports.AstImportGenerationJavaService = AstImportGenerationJavaService;
