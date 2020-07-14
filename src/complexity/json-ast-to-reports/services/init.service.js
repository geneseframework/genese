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
/**
 * - AstFolders generation from Abstract Syntax Tree of a folder
 */
class InitService {
    constructor() {
        this.astNodeService = new ast_node_service_1.AstNodeService(); // The service managing AstNodes
    }
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax Tree (AST) of the folder
     * @param jsonAst
     */
    generateAllFromJsonAst(jsonAst) {
        var _a, _b;
        const newJsonAst = new json_ast_model_1.JsonAst();
        const astFolder = new ast_folder_model_1.AstFolder();
        astFolder.path = this.getPathFromJsonAstFolder(jsonAst.astFolder);
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder, astFolder);
        if (Array.isArray((_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.children)) {
            for (const child of (_b = jsonAst.astFolder) === null || _b === void 0 ? void 0 : _b.children) {
                const newChild = this.generateChildrenAstFolder(child, astFolder);
                newChild.parent = jsonAst.astFolder;
                astFolder.children.push(newChild);
            }
        }
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }
    /**
     * Generates the children of a given AstFolder with the property "children" of the JsonAst object
     * @param astFolderFromJsonAst      // An element of the "children" property of the JsonAst (this property is an array). The first direct ancestor of this property which is not called "children" is the astFolder property at the root of the Json object
     * @param parentAstFolder           // The parent AstFolder
     */
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
    /**
     * Generates the AstFiles corresponding to a property "astFiles" in the JsonAst object
     * @param astFolderFromJsonAst      // The father of the astFiles property in the JsonAst object
     * @param astFolder                 // The AstFolder containing the astFiles
     */
    generateAstFiles(astFolderFromJsonAst, astFolder) {
        const astFiles = [];
        for (const astFileFromJsonAst of astFolderFromJsonAst.astFiles) {
            astFiles.push(this.generateAstFile(astFileFromJsonAst, astFolder));
        }
        return astFiles;
    }
    /**
     * Generates the AstFile corresponding to an element of the array astFiles in the JsonAst object
     * @param astFileFromJsonAst        // The element in the astFiles array in the JsonAst object
     * @param astFolder                 // The astFolder containing the AstFile
     */
    generateAstFile(astFileFromJsonAst, astFolder) {
        if (!(astFileFromJsonAst === null || astFileFromJsonAst === void 0 ? void 0 : astFileFromJsonAst.astNode)) {
            console.warn(astFileFromJsonAst.name ? `No AstNode for this file : ${astFileFromJsonAst.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new ast_file_model_1.AstFile();
        newAstFile.name = astFileFromJsonAst.name;
        newAstFile.astFolder = astFolder;
        newAstFile.code = code_service_1.CodeService.getCode(astFileFromJsonAst.text);
        newAstFile.astNode = this.getFileAstNode(astFileFromJsonAst.astNode, newAstFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
            return ast_service_1.Ast.isFunctionOrMethod(e);
        })
            .map(e => e.astMethod);
        return newAstFile;
    }
    /**
     * Generates the AstNode of a given AstFile with the astNode property in the JsonAst object
     * @param astNodeFromJsonAst        // The astNode property in the JsonAst object
     * @param astFile                   // The AstFile corresponding to the returned astNode
     */
    getFileAstNode(astNodeFromJsonAst, astFile) {
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.pos = 0;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = syntax_kind_enum_1.SyntaxKind.SourceFile;
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.astFile = astFile;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        return newAstNode;
    }
    /**
     * Generates the AstNodes which are the children of a given AstNode with the "children" property in the JsonAst object
     * @param astNodesFromJsonAst       // The astNode property in the JsonAst object which have some children
     * @param astParentNode             // The AstNode which contains the returned AstNode children
     */
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
    /**
     * Generates the AstNode corresponding to an astNode property in the JsonAst object
     * @param astNodeFromJsonAst        // The astNode property in the JsonAst object
     * @param astParentNode             // The AstNode parent of the AstNode to return
     */
    generateAstNode(astNodeFromJsonAst, astParentNode) {
        var _a;
        const newAstNode = new ast_node_model_1.AstNode();
        newAstNode.astFile = astParentNode.astFile;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = astNodeFromJsonAst.kind; // TODO : check if kind is correct
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.parent = astParentNode;
        newAstNode.pos = astNodeFromJsonAst.pos;
        newAstNode.start = astNodeFromJsonAst.start;
        newAstNode.text = astNodeFromJsonAst.text;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        if (ast_service_1.Ast.isFunctionOrMethod(astNodeFromJsonAst)) {
            if (!newAstNode.name && ((_a = newAstNode.firstSon) === null || _a === void 0 ? void 0 : _a.kind) === syntax_kind_enum_1.SyntaxKind.Identifier) {
                newAstNode.name = newAstNode.children[0].name;
            }
            newAstNode.astMethod = this.generateAstMethod(newAstNode);
        }
        else {
            newAstNode.astMethod = astParentNode === null || astParentNode === void 0 ? void 0 : astParentNode.astMethod;
        }
        return newAstNode;
    }
    /**
     * Generates the AstMethod corresponding to an AstNode with kind corresponding to a FunctionDeclaration or a MethodDeclaration
     * @param astMethodNode     // The AstNode which corresponds to a FunctionDeclaration or a MethodDeclaration
     */
    generateAstMethod(astMethodNode) {
        var _a, _b, _c;
        const astMethod = new ast_method_model_1.AstMethod();
        astMethod.astNode = astMethodNode;
        astMethod.astNode.text = this.astNodeService.getCode(astMethodNode);
        astMethod.codeLines = (_c = (_b = (_a = astMethodNode.astFile) === null || _a === void 0 ? void 0 : _a.code) === null || _b === void 0 ? void 0 : _b.lines) === null || _c === void 0 ? void 0 : _c.slice(astMethodNode.linePos - 1, astMethodNode.lineEnd);
        return astMethod;
    }
    /**
     * Returns the path without slash corresponding to the "path" property of the JsonAst object
     * @param jsonAstFolder
     */
    getPathFromJsonAstFolder(jsonAstFolder) {
        var _a;
        return ((_a = jsonAstFolder === null || jsonAstFolder === void 0 ? void 0 : jsonAstFolder.path) === null || _a === void 0 ? void 0 : _a.slice(-1)) === '/' ? jsonAstFolder.path.slice(0, -1) : jsonAstFolder.path;
    }
}
exports.InitService = InitService;
