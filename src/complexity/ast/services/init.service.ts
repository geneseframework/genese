import { JsonAst } from '../models/json-ast.model';
import { AstFolder } from '../models/ast-folder.model';
import { AstFile } from '../models/ast-file.model';
import { AstNode } from '../models/ast-node.model';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class InitService {


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
        console.log('AST FILESS', astFolder.astFiles)
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
        const newAstFile = new AstFile();
        newAstFile.end = astFile.end;
        newAstFile.name = astFile.name;
        newAstFile.text = astFile.text;
        newAstFile.children = this.generateAstNodes(astFile.children)
        newAstFile.logg();
        return newAstFile;
    }


    generateAstNodes(astNodes: AstNode[]): AstNode[] {
        if (!Array.isArray(astNodes)) {
            return [];
        }
        const newAstNodes: AstNode[] = [];
        for (const astNode of astNodes) {
            newAstNodes.push(this.generateAstNode(astNode));
        }
        return newAstNodes;
    }


    generateAstNode(astNode: AstNode): AstNode {
        const newAstNode = astNode;
        newAstNode.end = astNode.end;
        newAstNode.kind = astNode.kind; // TODO : check if kind is correct
        newAstNode.name = astNode.name;
        newAstNode.pos = astNode.pos;
        newAstNode.children = this.generateAstNodes(astNode.children);
        return newAstNode;
    }
}
