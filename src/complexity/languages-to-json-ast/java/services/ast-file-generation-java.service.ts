import { getFilename } from '../../../core/services/file.service';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { parse } from 'java-parser';
import { AstPackageGenerationJavaService } from './ast-package-generation-java.service';
import { AstImportGenerationJavaService } from './ast-import-generation-java.service';
import { AstClassGenerationJavaService } from './ast-class-generation-java.service';
import * as fs from 'fs-extra';
import { Java } from './java.service';

/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
export class AstFileGenerationJavaService {


    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param path          // The path of the file
     * @param astFolder     // The AstFolder containing the AstFile
     */
    generate(path: string, astFolder: AstFolderInterface): AstFileInterface {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const fileContent = fs.readFileSync(path,'utf8')
        const parsedFile = parse(fileContent);
        return {
            name: getFilename(path),
            text: fileContent,
            astNode: this.createAstNodeChildren(parsedFile)
        };
    }


    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    createAstNodeChildren(node): AstNodeInterface {
        let astNode: AstNodeInterface;

        if(node.children.ordinaryCompilationUnit){
            const ordinaryCompilationUnit = node.children.ordinaryCompilationUnit[0];
            
            astNode = Java.getAstNodeWithChildren(ordinaryCompilationUnit);
            astNode.kind = SyntaxKind.SourceFile;

            //Generate package
            if(ordinaryCompilationUnit.children.packageDeclaration){
                new AstPackageGenerationJavaService().generate(ordinaryCompilationUnit.children.packageDeclaration[0], astNode);
            }
                
            //Generate Import nodes
            if(ordinaryCompilationUnit.children.importDeclaration){
                new AstImportGenerationJavaService().generate(ordinaryCompilationUnit.children.importDeclaration, astNode);
                
            }

            //Generate typeDeclaration
            if(ordinaryCompilationUnit.children.typeDeclaration){
                this.getTypeDeclaration(ordinaryCompilationUnit.children.typeDeclaration, astNode);
            }
        }
        return astNode;
    }

    /**
     * 
     * @param typeDeclaration 
     */
    getTypeDeclaration(typeDeclaration, typeDeclarationAstNode): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(typeDeclaration[0]);
        astNode.kind = SyntaxKind.typeIdentifier;

        //classDeclaration
        if(typeDeclaration[0].children.classDeclaration){
            new AstClassGenerationJavaService().generate(typeDeclaration[0].children.classDeclaration, astNode);
        }

        typeDeclarationAstNode.children.push(astNode);
        
        return typeDeclarationAstNode;
    }
}
