"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFileConversionService = void 0;
const file_service_1 = require("../../../core/services/file.service");
const ts_service_1 = require("./ts.service");
const language_to_json_ast_1 = require("../../language-to-json-ast");
const syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
/**
 * - TsFiles generation from their Abstract Syntax Tree (AST)
 */
class TsFileConversionService {
    /**
     * Generates the TsFile corresponding to a given path and a given TsFolder
     * @param path          // The path of the file
     * @param astFolder     // The TsFolder containing the TsFile
     */
    generateTsFile(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        // const sourceFile: SourceFile = ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf8'));
        const sourceFile = language_to_json_ast_1.project.getSourceFileOrThrow(path);
        return {
            name: file_service_1.getFilename(path),
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile, sourceFile.compilerNode.getSourceFile())
        };
    }
    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node, sourceFile) {
        const start = Date.now();
        // const tsNode = node.compilerNode;
        const astNode = {
            end: node.getEnd(),
            kind: ts_service_1.Ts.getKindAlias(node),
            name: ts_service_1.Ts.getName(node),
            // name: Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        const type = ts_service_1.Ts.getType(node);
        if (type) {
            astNode.type = type;
        }
        // console.log('WEIGHTTTTT', WEIGHTS);
        if (astNode.type === 'function' && language_to_json_ast_1.WEIGHTED_METHODS.includes(astNode.name)) {
            const cpxFactors = this.getCpxFactors(node);
            if (cpxFactors) {
                astNode.cpxFactors = cpxFactors;
            }
        }
        const end = Date.now() - start;
        // if (end > 1)
        //     console.log('DURATIONNN', astNode.kind, astNode.name, end)
        node.forEachChild((childNode) => {
            if (!astNode.children) {
                astNode.children = [];
            }
            astNode.children.push(this.createAstNodeChildren(childNode, sourceFile));
        });
        return astNode;
    }
    getCpxFactors(node) {
        if (node.getKindName() !== syntax_kind_enum_1.SyntaxKind.Identifier) {
            return undefined;
        }
        const identifier = node;
        // showDuration('BEFORE GET CPX FACTTT')
        // const definition = identifier.getDefinitions()?.[0];
        // showDuration('AFTER GET CPX FACTTT')
        return undefined;
        // return this.useWeight(definition, Ts.getName(node));
    }
    useWeight(definition, nodeName) {
        if (!definition) {
            return undefined;
        }
        const lib = this.library(definition);
        const method = lib ? Object.keys(language_to_json_ast_1.WEIGHTS[lib]).find(e => e === nodeName) : undefined;
        const useCpx = method ?
            {
                use: {
                    method: language_to_json_ast_1.WEIGHTS[lib][method]
                }
            }
            : undefined;
        return useCpx;
    }
    // isInTypeScript(definition: DefinitionInfo): boolean {
    //     return this.library(definition.getSourceFile().getFilePath()) === 'TypeScript';
    // }
    // isInTsWeights(name: string): boolean {
    //     console.log('TSWEIGHTS NAMEEEE', name, Object.keys(TsWeights), TsWeights[name.toString()])
    //     return Object.keys(TsWeights).includes(name)
    // }
    // TODO: Refacto
    library(definition) {
        const path = definition.getSourceFile().getFilePath();
        return path.match(/typescript\/lib/) ? 'typescript' : undefined;
    }
}
exports.TsFileConversionService = TsFileConversionService;
