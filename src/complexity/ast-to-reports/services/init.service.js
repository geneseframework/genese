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
const chalk = require("chalk");
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
        astFolder.path = jsonAst.astFolder.path;
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder, astFolder);
        if (Array.isArray((_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.children)) {
            for (const child of (_b = jsonAst.astFolder) === null || _b === void 0 ? void 0 : _b.children) {
                const newChild = this.generateChildrenAstFolder(jsonAst.astFolder, astFolder);
                newChild.parent = jsonAst.astFolder;
                astFolder.children.push(newChild);
            }
        }
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
        if (!(astFileFromJsonAst === null || astFileFromJsonAst === void 0 ? void 0 : astFileFromJsonAst.astNode)) {
            console.warn(astFileFromJsonAst.name ? `No AstNode for this file : ${astFileFromJsonAst.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new ast_file_model_1.AstFile();
        newAstFile.name = astFileFromJsonAst.name;
        console.log('TXTTT BEFORE', astFileFromJsonAst.text);
        // let parse = {
        //     text: astFileFromJsonAst.text
        // }
        // console.log(chalk.yellowBright('PARSSSE'), JSON.parse(JSON.stringify(parse)))
        // let text: string = astFileFromJsonAst.text;
        // console.log('SLICE', text.slice(0,1))
        // console.log('SLICE 2', text.slice(-1))
        // text = text.slice(0,1) === '"' ? `\\${text}` : text;
        // text = text.slice(-1) === '"' ? `${text}\\` : text;
        // text = `{"text": "${text}"}`;
        // console.log('TXTTT AFTER', text)
        // console.log('TXTTT', JSON.parse(text).text)
        // newAstFile.text = text;
        // throw Error
        newAstFile.text = astFileFromJsonAst.text;
        console.log('NEW ASTFFFF', newAstFile.text);
        // newAstFile.text = JSON.parse(JSON.stringify(parse))?.text;
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
        astNode.logg();
        const astMethod = new ast_method_model_1.AstMethod();
        astMethod.astNode = astNode;
        astMethod.astNode.text = this.astNodeService.getCode(astNode);
        const zzz = this.astNodeService.getCode(astNode);
        console.log(chalk.yellowBright('ZZZZZZZZ', zzz));
        astMethod.originalCode = code_service_1.CodeService.getCode(this.astNodeService.getCode(astNode));
        console.log('ORIGINAL CODEEEE', astMethod.originalCode);
        console.log('ORIGINAL CODEEEE TXT', astMethod.originalCode.text);
        // let stringified = JSON.stringify(astMethod.originalCode);
        // console.log('ORIGINAL CODEEEE', stringified)
        // stringified = stringified.replace(/\\\\/g, `\\`)
        // console.log('ORIGINAL CODEEEE PURFIED', stringified)
        // const aaa = JSON.parse(stringified);
        // console.log('ORIGINAL AAAAAA', aaa)
        // astMethod.originalCode.text = stringified;
        // console.log(chalk.greenBright('ORIGINAL CODEEEE'), astMethod.originalCode)
        // for (const char of astMethod.originalCode.text) {
        //     console.log('CHARRR', char);
        // }
        // console.log('ORIGINAL CODEEEE TXT', astMethod.originalCode.text.match(/\n/))
        return astMethod;
    }
}
exports.InitService = InitService;
