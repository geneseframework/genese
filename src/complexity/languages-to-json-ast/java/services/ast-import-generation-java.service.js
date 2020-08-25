"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstImportGenerationJavaService = void 0;
const java_service_1 = require("./java.service");
const syntax_kind_enum_1 = require("../core/syntax-kind.enum");
const genese_mapper_service_1 = require("./genese-mapper.service");
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
            astNode.kind = syntax_kind_enum_1.SyntaxKind.importDeclaration;
            //ImportDeclaration mapping
            const importObject = genese_mapper_service_1.GeneseMapperService.getMappedImport(child);
            if ((importObject === null || importObject === void 0 ? void 0 : importObject.name) === syntax_kind_enum_1.SyntaxKind.importDeclaration && importObject.children) {
                //Import
                if (child.children.Import) {
                    java_service_1.Java.getImport(child.children.Import, astNode);
                }
                //packageOrTypeName
                if (child.children.packageOrTypeName) {
                    this.getPackageOrTypeName(child.children.packageOrTypeName[0], astNode);
                }
                //Semicolon
                if (child.children.Semicolon) {
                    java_service_1.Java.getSemicolon(child.children.Semicolon, astNode);
                }
                importNodes.children.push(astNode);
            }
        });
        return importNodes;
    }
    /**
     *
     * @param packageOrTypeName
     * @param packageOrTypeNameAstNode
     */
    getPackageOrTypeName(packageOrTypeName, packageOrTypeNameAstNode) {
        let astNode = java_service_1.Java.getAstNodeWithChildren(packageOrTypeName);
        astNode.kind = syntax_kind_enum_1.SyntaxKind.packageOrTypeName;
        //mapper packageOrTypeName
        const packageOrTypeNameObject = genese_mapper_service_1.GeneseMapperService.getMappedPackageOrTypeName(packageOrTypeName);
        if ((packageOrTypeNameObject === null || packageOrTypeNameObject === void 0 ? void 0 : packageOrTypeNameObject.name) === syntax_kind_enum_1.SyntaxKind.packageOrTypeName && packageOrTypeNameObject.children) {
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
