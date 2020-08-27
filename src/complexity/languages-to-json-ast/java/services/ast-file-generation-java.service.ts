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
import { GeneseMapperService } from './genese-mapper.service';
import { CompilationUnit } from '../models/compilation-unit.model';
import { TypeDeclaration } from '../models/type.declaration-model';

/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
export class AstFileGenerationJavaService {


    
    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param  {string} path
     * @param  {AstFolderInterface} astFolder
     * @returns AstFileInterface
     */
    generate(path: string, astFolder: AstFolderInterface): AstFileInterface {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        
        const fileContent = fs.readFileSync(path,'utf8')
        const compilationUnit: CompilationUnit = GeneseMapperService.getMappedCompilationUnit(parse(fileContent));
        
        return {
            name: getFilename(path),
            text: fileContent,
            astNode: this.createAstNodeChildren(compilationUnit)
        };
    }

    /**
     * @param  {CompilationUnit} compilationUnit
     * @returns AstNodeInterface
     */
    createAstNodeChildren(compilationUnit: CompilationUnit): AstNodeInterface {
        let astNode: AstNodeInterface;

        if (!compilationUnit?.children?.ordinaryCompilationUnit) {
            return undefined;
        }
        
        const ordinaryCompilationUnit = compilationUnit.children.ordinaryCompilationUnit[0];
            
        astNode = Java.getAstNodeWithChildren(ordinaryCompilationUnit);
        astNode.kind = SyntaxKind.SourceFile;
            
        if(ordinaryCompilationUnit.children.packageDeclaration){
            new AstPackageGenerationJavaService().generate(ordinaryCompilationUnit.children.packageDeclaration[0], astNode);
        }
                
        if(ordinaryCompilationUnit.children.importDeclaration){
            new AstImportGenerationJavaService().generate(ordinaryCompilationUnit.children.importDeclaration, astNode);
        }

        if(ordinaryCompilationUnit.children.typeDeclaration){
            this.getTypeDeclaration(ordinaryCompilationUnit.children.typeDeclaration, astNode);
        }

        return astNode;
    }

    /**
     * @param  {TypeDeclaration[]} typeDeclarationList
     * @param  {AstNodeInterface} typeDeclarationAstNode
     * @returns AstNodeInterface
     */
    getTypeDeclaration(typeDeclarationList: TypeDeclaration[], typeDeclarationAstNode: AstNodeInterface): AstNodeInterface{
        typeDeclarationList.forEach(typeDeclaration => {
            let astNode = Java.getAstNodeWithChildren(typeDeclaration);
            astNode.kind = SyntaxKind.typeIdentifier;

            if(typeDeclaration.children?.classDeclaration){
                new AstClassGenerationJavaService().generate(typeDeclaration.children.classDeclaration, astNode);
            }
            typeDeclarationAstNode.children.push(astNode);
        });
        
        return typeDeclarationAstNode;
    }
}
