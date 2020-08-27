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
        let astNode = java_service_1.Java.getAstNodeWithChildren(packageDeclaration);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.PackageDeclaration;
        if (packageDeclaration.children.Identifier) {
            java_service_1.Java.getIdentifier(packageDeclaration.children.Identifier, astNode);
        }
        packageAstNode.children.push(astNode);
        return packageAstNode;
    }
}
exports.AstPackageGenerationJavaService = AstPackageGenerationJavaService;
