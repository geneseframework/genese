"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstPackageGenerationJavaService = void 0;
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
const java_service_1 = require("./java.service");
/**
 * - Generate AstNode for package from their Abstract Syntax Tree (AST)
 */
class AstPackageGenerationJavaService {
    /**
     * Gets the package Node
     * @param  {PackageDeclaration} packageDeclaration
     * @param  {AstNodeInterface} packageAstNode
     * @returns AstNodeInterface
     */
    generate(packageDeclaration, packageAstNode) {
        let astNode = java_service_1.JavaService.getAstNodeWithChildren(packageDeclaration);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.PackageDeclaration;
        this.generatePackageChildren(packageDeclaration.children, astNode);
        packageAstNode.children.push(astNode);
        return packageAstNode;
    }
    /**
     * @param  {PackageDeclarationChildren} packageDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generatePackageChildren(packageDeclarationChildren, astNode) {
        if (packageDeclarationChildren) {
            java_service_1.JavaService.getAstNodeInfos(packageDeclarationChildren.package, astNode);
            java_service_1.JavaService.getAstNodeInfos(packageDeclarationChildren.identifier, astNode);
            java_service_1.JavaService.getAstNodeInfos(packageDeclarationChildren.dot, astNode);
            java_service_1.JavaService.getAstNodeInfos(packageDeclarationChildren.semicolon, astNode);
        }
    }
}
exports.AstPackageGenerationJavaService = AstPackageGenerationJavaService;
