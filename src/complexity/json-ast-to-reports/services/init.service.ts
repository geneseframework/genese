import { JsonAst } from '../models/ast/json-ast.model';
import { AstFolder } from '../models/ast/ast-folder.model';
import { AstFile } from '../models/ast/ast-file.model';
import { AstNode } from '../models/ast/ast-node.model';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { AstMethod } from '../models/ast/ast-method.model';
import { CodeService } from './code.service';
import { AstNodeService } from './ast/ast-node.service';
import { Ast } from './ast/ast.service';
import * as chalk from 'chalk';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class InitService {


    astNodeService: AstNodeService = new AstNodeService();


    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param jsonAst
     */
    generateAllFromJsonAst(jsonAst: JsonAst): JsonAst {
        const newJsonAst = new JsonAst();
        const astFolder = new AstFolder();
        astFolder.path = this.getPathFromJsonAstFolder(jsonAst.astFolder);
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder, astFolder);
        if (Array.isArray(jsonAst.astFolder?.children)) {
            for (const child of jsonAst.astFolder?.children) {
                const newChild = this.generateChildrenAstFolder(child, astFolder);
                newChild.parent = jsonAst.astFolder;
                astFolder.children.push(newChild);
            }
        }
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }


    private generateChildrenAstFolder(astFolderFromJsonAst: any, parentAstFolder: AstFolder): AstFolder {
        const newAstFolder = new AstFolder();
        newAstFolder.path = this.getPathFromJsonAstFolder(astFolderFromJsonAst);
        newAstFolder.parent = parentAstFolder;
        newAstFolder.astFiles = this.generateAstFiles(astFolderFromJsonAst, newAstFolder);
        for (const childFolderFromJsonAst of astFolderFromJsonAst.children) {
            newAstFolder.children.push(this.generateChildrenAstFolder(childFolderFromJsonAst, newAstFolder));
        }
        return newAstFolder;
    }


    private generateAstFiles(astFolderFromJsonAst: any, astFolder: AstFolder): AstFile[] {
        const astFiles: AstFile[] = [];
        for (const astFileFromJsonAst of astFolderFromJsonAst.astFiles) {
            astFiles.push(this.generateAstFile(astFileFromJsonAst, astFolder));
        }
        return astFiles;
    }


    private generateAstFile(astFileFromJsonAst: any, astFolder: AstFolder): AstFile {
        if (!astFileFromJsonAst?.astNode) {
            console.warn(astFileFromJsonAst.name ? `No AstNode for this file : ${astFileFromJsonAst.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new AstFile();
        newAstFile.name = astFileFromJsonAst.name;
        newAstFile.astFolder = astFolder;
        newAstFile.code = CodeService.getCode(astFileFromJsonAst.text);
        newAstFile.astNode = this.getFileAstNode(astFileFromJsonAst.astNode, newAstFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
                return Ast.isFunctionOrMethod(e)
            })
            .map(e => e.astMethod);
        return newAstFile;
    }


    private getFileAstNode(astNodeFromJsonAst: any, astFile: AstFile): AstNode {
        const newAstNode = new AstNode();
        newAstNode.pos = 0;
        newAstNode.end = astNodeFromJsonAst.end; // TODO: fix
        newAstNode.kind = SyntaxKind.SourceFile;
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.astFile = astFile;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        return newAstNode;
    }


    private generateAstNodes(astNodesFromJsonAst: any[], astParentNode: AstNode): AstNode[] {
        if (!Array.isArray(astNodesFromJsonAst)) {
            return [];
        }
        const newAstNodes: AstNode[] = [];
        for (const astNodeFromJsonAst of astNodesFromJsonAst) {
            newAstNodes.push(this.generateAstNode(astNodeFromJsonAst, astParentNode));
        }
        return newAstNodes;
    }


    private generateAstNode(astNodeFromJsonAst: any, astParentNode: AstNode): AstNode {
        const newAstNode = new AstNode();
        newAstNode.astFile = astParentNode.astFile;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = astNodeFromJsonAst.kind; // TODO : check if kind is correct
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.parent = astParentNode;
        newAstNode.pos = astNodeFromJsonAst.pos;
        newAstNode.start = astNodeFromJsonAst.start;
        newAstNode.text = astNodeFromJsonAst.text;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        if (Ast.isFunctionOrMethod(astNodeFromJsonAst)) {
            if (!newAstNode.name && newAstNode.firstSon?.kind === SyntaxKind.Identifier) {
                newAstNode.name = newAstNode.children[0].name;
            }
            newAstNode.astMethod = this.generateAstMethod(newAstNode);
        } else {
            newAstNode.astMethod = astParentNode?.astMethod;
        }
        return newAstNode;
    }


    private generateAstMethod(astMethodNode: AstNode): AstMethod {
        const astMethod = new AstMethod();
        astMethod.astNode = astMethodNode;
        astMethod.astNode.text = this.astNodeService.getCode(astMethodNode);
        astMethod.codeLines = astMethodNode.astFile?.code?.lines?.slice(astMethodNode.linePos, astMethodNode.lineEnd);
        return astMethod;
    }


    private getPathFromJsonAstFolder(jsonAstFolder: any): string {
        return jsonAstFolder?.path?.slice(-1) === '/' ? jsonAstFolder.path.slice(0, -1) : jsonAstFolder.path;
    }

}
