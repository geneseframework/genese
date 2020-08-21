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
    generate(node, importNodes) {
        node.forEach(child => {
            let astNode = java_service_1.Java.getAstNodeWithChildren(child);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.import;
            //identifiers
            if (child.children.packageOrTypeName[0].children.Identifier) {
                java_service_1.Java.getIdentifier(child.children.packageOrTypeName[0].children.Identifier, astNode);
                importNodes.children.push(astNode);
            }
        });
        return importNodes;
    }
}
exports.AstImportGenerationJavaService = AstImportGenerationJavaService;
