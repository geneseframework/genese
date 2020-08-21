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
     * @param node // AST Node
     */
    generate(node, packageNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(node);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.PackageDeclaration;
        //Identifier
        if (node.children.Identifier) {
            java_service_1.Java.getIdentifier(node.children.Identifier, astNode);
        }
        packageNode.children.push(astNode);
        return packageNode;
    }
}
exports.AstPackageGenerationJavaService = AstPackageGenerationJavaService;
