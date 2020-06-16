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
    generateAllFromJsonAst(jsonAst) {
        var _a;
        const newJsonAst = new json_ast_model_1.JsonAst();
        const astFolder = new ast_folder_model_1.AstFolder();
        astFolder.path = jsonAst.astFolder.path;
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder, astFolder);
        for (const child of (_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.children) {
            const newChild = this.generateChildrenAstFolder(jsonAst.astFolder, astFolder);
            newChild.parent = jsonAst.astFolder;
            // newChild.children = this.generateAllFromJsonAst()
            astFolder.children.push(newChild);
        }
        // astFolder.children = this.generateChildrenAstFolder(jsonAst.astFolder, )
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }
    generateChildrenAstFolder(astFolderFromJsonAst, parentAstFolder) {
        const newAstFolder = new ast_folder_model_1.AstFolder();
        newAstFolder.path = astFolderFromJsonAst.path;
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
            astFiles.push(this.generateAstFile(astFileFromJsonAst, astFolder));
        }
        return astFiles;
    }
    generateAstFile(astFileFromJsonAst, astFolder) {
        if (!astFileFromJsonAst.astNode) {
            console.warn(astFileFromJsonAst.name ? `No AstNode for this file : ${astFileFromJsonAst.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new ast_file_model_1.AstFile();
        newAstFile.text = astFileFromJsonAst.text;
        newAstFile.astFolder = astFolder;
        newAstFile.astNode = this.getFileAstNode(astFileFromJsonAst.astNode, newAstFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
            return ast_service_1.AstService.isFunctionOrMethod(e);
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
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.astFile = astParentNode.astFile;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = astNodeFromJsonAst.kind; // TODO : check if kind is correct
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.parent = astParentNode;
        newAstNode.pos = astNodeFromJsonAst.pos;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        if (ast_service_1.AstService.isFunctionOrMethod(astNodeFromJsonAst)) {
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
}
exports.InitService = InitService;
