"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitService = void 0;
const json_ast_model_1 = require("../models/ast/json-ast.model");
const ast_folder_model_1 = require("../models/ast/ast-folder.model");
const ast_file_model_1 = require("../models/ast/ast-file.model");
const ast_node_model_1 = require("../models/ast/ast-node.model");
const syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
const ast_method_model_1 = require("../models/ast/ast-method.model");
const code_service_1 = require("./code.service");
const ast_node_service_1 = require("./ast/ast-node.service");
const ast_service_1 = require("./ast/ast.service");
const main_ast_1 = require("../main-ast");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class InitService {
    constructor() {
        this.astNodeService = new ast_node_service_1.AstNodeService();
    }
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param jsonAst
     */
    generateAllFromJsonAst(jsonAst) {
        var _a, _b;
        const newJsonAst = new json_ast_model_1.JsonAst();
        const astFolder = new ast_folder_model_1.AstFolder();
        astFolder.path = this.getPathFromJsonAstFolder(jsonAst.astFolder);
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder, astFolder);
        if (Array.isArray((_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.children) && !main_ast_1.DEBUG) {
            for (const child of (_b = jsonAst.astFolder) === null || _b === void 0 ? void 0 : _b.children) {
                const newChild = this.generateChildrenAstFolder(child, astFolder);
                newChild.parent = jsonAst.astFolder;
                astFolder.children.push(newChild);
            }
        }
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }
    generateChildrenAstFolder(astFolderFromJsonAst, parentAstFolder) {
        const newAstFolder = new ast_folder_model_1.AstFolder();
        newAstFolder.path = this.getPathFromJsonAstFolder(astFolderFromJsonAst);
        newAstFolder.parent = parentAstFolder;
        newAstFolder.astFiles = this.generateAstFiles(astFolderFromJsonAst, newAstFolder);
        for (const childFolderFromJsonAst of astFolderFromJsonAst.children) {
            newAstFolder.children.push(this.generateChildrenAstFolder(childFolderFromJsonAst, newAstFolder));
        }
        return newAstFolder;
    }
    generateAstFiles(astFolderFromJsonAst, astFolder) {
        const astFiles = [];
        for (const astFileFromJsonAst of astFolderFromJsonAst.astFiles) {
            if (!main_ast_1.DEBUG || astFileFromJsonAst.name === 'debug.mock.ts') {
                astFiles.push(this.generateAstFile(astFileFromJsonAst, astFolder));
            }
        }
        return astFiles;
    }
    generateAstFile(astFileFromJsonAst, astFolder) {
        if (!(astFileFromJsonAst === null || astFileFromJsonAst === void 0 ? void 0 : astFileFromJsonAst.astNode)) {
            console.warn(astFileFromJsonAst.name ? `No AstNode for this file : ${astFileFromJsonAst.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new ast_file_model_1.AstFile();
        newAstFile.name = astFileFromJsonAst.name;
        newAstFile.text = astFileFromJsonAst.text;
        newAstFile.astFolder = astFolder;
        newAstFile.astNode = this.getFileAstNode(astFileFromJsonAst.astNode, newAstFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
            return ast_service_1.Ast.isFunctionOrMethod(e);
        })
            .map(e => e.astMethod);
        return newAstFile;
    }
    getFileAstNode(astNodeFromJsonAst, astFile) {
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.pos = 0;
        newAstNode.end = astNodeFromJsonAst.end; // TODO: fix
        newAstNode.kind = syntax_kind_enum_1.SyntaxKind.SourceFile;
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.astFile = astFile;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        return newAstNode;
    }
    generateAstNodes(astNodesFromJsonAst, astParentNode) {
        if (!Array.isArray(astNodesFromJsonAst)) {
            return [];
        }
        const newAstNodes = [];
        for (const astNodeFromJsonAst of astNodesFromJsonAst) {
            newAstNodes.push(this.generateAstNode(astNodeFromJsonAst, astParentNode));
        }
        return newAstNodes;
    }
    generateAstNode(astNodeFromJsonAst, astParentNode) {
        var _a;
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.astFile = astParentNode.astFile;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = astNodeFromJsonAst.kind; // TODO : check if kind is correct
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.parent = astParentNode;
        newAstNode.pos = astNodeFromJsonAst.pos;
        newAstNode.text = astNodeFromJsonAst.text;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        if (ast_service_1.Ast.isFunctionOrMethod(astNodeFromJsonAst)) {
            if (!newAstNode.name && ((_a = newAstNode.firstSon) === null || _a === void 0 ? void 0 : _a.kind) === syntax_kind_enum_1.SyntaxKind.Identifier) {
                newAstNode.name = newAstNode.children[0].name;
            }
            newAstNode.astMethod = this.generateAstMethod(newAstNode);
        }
        return newAstNode;
    }
    generateAstMethod(astNode) {
        const astMethod = new ast_method_model_1.AstMethod();
        astMethod.astNode = astNode;
        astMethod.astNode.text = this.astNodeService.getCode(astNode);
        astMethod.originalCode = code_service_1.CodeService.getCode(this.astNodeService.getCode(astNode));
        return astMethod;
    }
    getPathFromJsonAstFolder(jsonAstFolder) {
        var _a;
        return ((_a = jsonAstFolder === null || jsonAstFolder === void 0 ? void 0 : jsonAstFolder.path) === null || _a === void 0 ? void 0 : _a.slice(-1)) === '/' ? jsonAstFolder.path.slice(0, -1) : jsonAstFolder.path;
    }
}
exports.InitService = InitService;
