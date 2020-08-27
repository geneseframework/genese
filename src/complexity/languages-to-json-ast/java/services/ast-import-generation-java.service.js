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
    generate(importDeclaration, importAstNodes) {
        importDeclaration.forEach(importObject => {
            let astNode = java_service_1.Java.getAstNodeWithChildren(importObject);
            astNode.kind = syntax_kind_enum_1.SyntaxKind.importDeclaration;
            if ((importObject === null || importObject === void 0 ? void 0 : importObject.name) === syntax_kind_enum_1.SyntaxKind.importDeclaration && importObject.children) {
                //Import
                if (importObject.children.Import) {
                    java_service_1.Java.getImport(importObject.children.Import, astNode);
                }
                //packageOrTypeName
                if (importObject.children.packageOrTypeName) {
                    this.getPackageOrTypeName(importObject.children.packageOrTypeName[0], astNode);
                }
                //Semicolon
                if (importObject.children.Semicolon) {
                    java_service_1.Java.getSemicolon(importObject.children.Semicolon, astNode);
                }
                importAstNodes.children.push(astNode);
            }
        });
        return importAstNodes;
    }
    /**
     *
     * @param packageOrTypeName
     * @param packageOrTypeNameAstNode
     */
    getPackageOrTypeName(packageOrTypeName, packageOrTypeNameAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(packageOrTypeName);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.packageOrTypeName;
        if ((packageOrTypeName === null || packageOrTypeName === void 0 ? void 0 : packageOrTypeName.name) === syntax_kind_enum_1.SyntaxKind.packageOrTypeName && packageOrTypeName.children) {
            //identifiers
            if (packageOrTypeName.children.Identifier) {
                java_service_1.Java.getIdentifier(packageOrTypeName.children.Identifier, astNode);
            }
        }
        packageOrTypeNameAstNode.children.push(astNode);
        return packageOrTypeNameAstNode;
    }
}
exports.AstImportGenerationJavaService = AstImportGenerationJavaService;
