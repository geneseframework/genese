"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitService = void 0;
const json_ast_model_1 = require("../models/ast/json-ast.model");
const ast_folder_model_1 = require("../models/ast/ast-folder.model");
const ast_file_model_1 = require("../models/ast/ast-file.model");
const ast_node_model_1 = require("../models/ast/ast-node.model");
const syntax_kind_enum_1 = require("../enums/syntax-kind.enum");
const ast_service_1 = require("./ast/ast.service");
const ast_method_model_1 = require("../models/ast/ast-method.model");
const code_service_1 = require("./code.service");
const ast_node_service_1 = require("./ast/ast-node.service");
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
    generateAstFolders(jsonAst) {
        var _a;
        const newJsonAst = new json_ast_model_1.JsonAst();
        const astFolder = new ast_folder_model_1.AstFolder();
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder);
        astFolder.path = jsonAst.astFolder.path;
        for (const child of (_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.children) {
            const newChild = this.generateAstFolder(child);
            newChild.parent = jsonAst.astFolder;
            astFolder.children.push(newChild);
        }
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }
    generateAstFolder(astFolder) {
        const newAstFolder = new ast_folder_model_1.AstFolder();
        newAstFolder.path = astFolder.path;
        newAstFolder.parent = astFolder.parent;
        newAstFolder.astFiles = this.generateAstFiles(astFolder);
        for (const childFolder of astFolder.children) {
            newAstFolder.children.push(this.generateAstFolder(childFolder));
        }
        return newAstFolder;
    }
    generateAstFiles(astFolder) {
        const astFiles = [];
        for (const astFile of astFolder.astFiles) {
            astFiles.push(this.generateAstFile(astFile));
        }
        return astFiles;
    }
    generateAstFile(astFile) {
        if (!astFile.astNode) {
            console.warn(astFile.name ? `No AstNode for this file : ${astFile.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new ast_file_model_1.AstFile();
        newAstFile.text = astFile.text;
        newAstFile.astNode = this.getFileAstNode(astFile.astNode, astFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
            return ast_service_1.AstService.isFunctionOrMethod(e);
        })
            .map(e => e.astMethod);
        return newAstFile;
    }
    getFileAstNode(astNode, astFile) {
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.pos = 0;
        newAstNode.end = astNode.end; // TODO: fix
        newAstNode.kind = syntax_kind_enum_1.SyntaxKind.SourceFile;
        newAstNode.name = astNode.name;
        newAstNode.astFile = astFile;
        newAstNode.children = this.generateAstNodes(astNode.children, newAstNode);
        return newAstNode;
    }
    generateAstNodes(astNodes, astParentNode) {
        if (!Array.isArray(astNodes)) {
            return [];
        }
        const newAstNodes = [];
        for (const astNode of astNodes) {
            newAstNodes.push(this.generateAstNode(astNode, astParentNode));
        }
        return newAstNodes;
    }
    generateAstNode(astNode, astParentNode) {
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.astFile = astParentNode.astFile;
        newAstNode.end = astNode.end;
        newAstNode.kind = astNode.kind; // TODO : check if kind is correct
        newAstNode.name = astNode.name;
        newAstNode.parent = astParentNode;
        newAstNode.pos = astNode.pos;
        newAstNode.children = this.generateAstNodes(astNode.children, newAstNode);
        if (ast_service_1.AstService.isFunctionOrMethod(astNode)) {
            newAstNode.astMethod = this.generateAstMethod(newAstNode);
        }
        return newAstNode;
    }
    generateAstMethod(astNode) {
        const astMethod = new ast_method_model_1.AstMethod();
        astMethod.astNode = astNode;
        astMethod.originalCode = code_service_1.CodeService.getCode(astNode.text);
        return astMethod;
    }
}
exports.InitService = InitService;
