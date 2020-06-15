import { JsonAst } from '../models/ast/json-ast.model';
import { AstFolder } from '../models/ast/ast-folder.model';
import { AstFile } from '../models/ast/ast-file.model';
import { AstNode } from '../models/ast/ast-node.model';
import { SyntaxKind } from '../enums/syntax-kind.enum';
import { AstService } from './ast/ast.service';
import { AstMethod } from '../models/ast/ast-method.model';
import { CodeService } from './code.service';
import { AstNodeService } from './ast/ast-node.service';

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
    generateAstFolders(jsonAst: JsonAst): JsonAst {
        const newJsonAst = new JsonAst();
        const astFolder = new AstFolder();
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder);
        astFolder.path = jsonAst.astFolder.path;
        for (const child of jsonAst.astFolder?.children) {
            const newChild = this.generateAstFolder(child);
            newChild.parent = jsonAst.astFolder;
            astFolder.children.push(newChild);
        }
        console.log('AST FOLDER PATH', astFolder.path)
        console.log('AST FILESS', astFolder.astFiles[0].name)
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }


    generateAstFolder(astFolder: AstFolder): AstFolder {
        const newAstFolder = new AstFolder();
        newAstFolder.path = astFolder.path;
        newAstFolder.parent = astFolder.parent;
        newAstFolder.astFiles = this.generateAstFiles(astFolder);
        for (const childFolder of astFolder.children) {
            newAstFolder.children.push(this.generateAstFolder(childFolder));
        }
        return newAstFolder;
    }


    generateAstFiles(astFolder: AstFolder): AstFile[] {
        const astFiles: AstFile[] = [];
        for (const astFile of astFolder.astFiles) {
            astFiles.push(this.generateAstFile(astFile));
        }
        return astFiles;
    }


    generateAstFile(astFile: AstFile): AstFile {
        if (!astFile.astNode) {
            console.warn(astFile.name ? `No AstNode for this file : ${astFile.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new AstFile();
        newAstFile.text = astFile.text;
        newAstFile.astNode = this.getFileAstNode(astFile.astNode, astFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
                return AstService.isFunctionOrMethod(e)
            })
            .map(e => e.astMethod);
        return newAstFile;
    }


    getFileAstNode(astNode: AstNode, astFile: AstFile): AstNode {
        const newAstNode = new AstNode();
        newAstNode.pos = 0;
        newAstNode.end = astNode.end; // TODO: fix
        newAstNode.kind = SyntaxKind.SourceFile;
        newAstNode.name = astNode.name;
        newAstNode.astFile = astFile;
        newAstNode.children = this.generateAstNodes(astNode.children, astFile);
        return newAstNode;
    }


    generateAstNodes(astNodes: AstNode[], astFile: AstFile): AstNode[] {
        if (!Array.isArray(astNodes)) {
            return [];
        }
        const newAstNodes: AstNode[] = [];
        for (const astNode of astNodes) {
            newAstNodes.push(this.generateAstNode(astNode, astFile));
        }
        return newAstNodes;
    }


    generateAstNode(astNode: AstNode, astFile: AstFile): AstNode {
        const newAstNode = new AstNode();
        newAstNode.astFile = astFile;
        newAstNode.end = astNode.end;
        newAstNode.kind = astNode.kind; // TODO : check if kind is correct
        newAstNode.name = astNode.name;
        newAstNode.pos = astNode.pos;
        newAstNode.children = this.generateAstNodes(astNode.children, astFile);
        if (AstService.isFunctionOrMethod(astNode)) {
            newAstNode.astMethod = this.generateAstMethod(newAstNode);
        }
        return newAstNode;
    }


    generateAstMethod(astNode: AstNode): AstMethod {
        const astMethod = new AstMethod();
        astMethod.astNode = astNode;
        // astMethod.originalCode = CodeService.getCode(astNode.text);
        return astMethod;
    }
}
