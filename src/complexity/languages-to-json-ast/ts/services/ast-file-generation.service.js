"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFileGenerationService = void 0;
const file_service_1 = require("../../../core/services/file.service");
const ts_service_1 = require("./ts.service");
const language_to_json_ast_1 = require("../../language-to-json-ast");
const syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
class AstFileGenerationService {
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
        const sourceFile = language_to_json_ast_1.project.getSourceFileOrThrow(path);
        return {
            name: file_service_1.getFilename(path),
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile)
        };
    }
    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node) {
        let astNode = {
            end: node.getEnd(),
            kind: ts_service_1.Ts.getKindAlias(node),
            name: ts_service_1.Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        astNode = this.addTypeAndCpxFactors(node, astNode);
        node.forEachChild((childNode) => {
            if (!astNode.children) {
                astNode.children = [];
            }
            astNode.children.push(this.createAstNodeChildren(childNode));
        });
        return astNode;
    }
    /**
     * Adds the type to identifiers or parameters and calculates the CpxFactors of identifiers
     * @param node          // The Node to analyse
     * @param astNode       // The AstNode which will be updated with its type and CpxFactors
     */
    addTypeAndCpxFactors(node, astNode) {
        const type = ts_service_1.Ts.getType(node);
        if (type) {
            astNode.type = type;
            if (astNode.type === 'function' && language_to_json_ast_1.WEIGHTED_METHODS.includes(astNode.name)) {
                const cpxFactors = this.getCpxFactors(node);
                if (cpxFactors) {
                    astNode.cpxFactors = cpxFactors;
                }
            }
        }
        return astNode;
    }
    /**
     * Returns the CpxFactors of a given Node (Identifier)
     * @param node      // The Node to analyse
     */
    getCpxFactors(node) {
        var _a;
        if (node.getKindName() !== syntax_kind_enum_1.SyntaxKind.Identifier) {
            return undefined;
        }
        const identifier = node;
        const definition = (_a = identifier.getDefinitions()) === null || _a === void 0 ? void 0 : _a[0];
        return this.useWeight(definition, ts_service_1.Ts.getName(node));
    }
    /**
     * Returns the cpxFActors relative to method usage.
     * @param definition        // The DefinitionInfo of the Node corresponding to a method
     * @param nodeName          // The name of the Node (redundant, but avoids new calculation of this value)
     */
    useWeight(definition, nodeName) {
        if (!definition) {
            return undefined;
        }
        const lib = this.library(definition);
        const method = lib ? Object.keys(language_to_json_ast_1.WEIGHTS[lib]).find(e => e === nodeName) : undefined;
        return method ?
            {
                use: {
                    method: language_to_json_ast_1.WEIGHTS[lib][method]
                }
            }
            : undefined;
    }
    // TODO: implement this method for libraries different than TypeScript itself
    /**
     * Returns the library corresponding to the DefinitionInfo of a method's Node.
     * @param definition
     */
    library(definition) {
        const path = definition.getSourceFile().getFilePath();
        return path.match(/typescript\/lib/) ? 'typescript' : undefined;
    }
}
exports.AstFileGenerationService = AstFileGenerationService;
