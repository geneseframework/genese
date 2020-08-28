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
import { JavaService } from './java.service';
import { GeneseMapperService } from './genese-mapper.service';
import { CompilationUnit } from '../models/compilation-unit.model';
import { TypeDeclaration } from '../models/type.declaration-model';
import { OrdinaryCompilationUnitChildren } from '../models/ordinary-compilation-unit-children.model';
import { OrdinaryCompilationUnit } from '../models/ordinary-compilation-unit.model';

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
        if (!compilationUnit?.children?.ordinaryCompilationUnit?.[0]?.children) {
            return undefined;
        }
        const ordinaryCompilationUnit: OrdinaryCompilationUnit = compilationUnit.children.ordinaryCompilationUnit[0];
        let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(ordinaryCompilationUnit);
        astNode.kind = SyntaxKind.SourceFile;
        this.generateAstPackageImportTypeDeclaration(ordinaryCompilationUnit.children, astNode);
        return astNode;
    }    
    
    /**
     * @param  {OrdinaryCompilationUnitChildren} children
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstPackageImportTypeDeclaration(children: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        this.generateAstPackage(children, astNode);
        this.generateAstImport(children, astNode);
        this.generateAstTypeDeclaration(children, astNode);
    }

    /**
     * @param  {OrdinaryCompilationUnitChildren} ordinaryCompilationUnitChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstPackage(ordinaryCompilationUnitChildren: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        if(ordinaryCompilationUnitChildren.packageDeclaration){
            new AstPackageGenerationJavaService().generate(ordinaryCompilationUnitChildren.packageDeclaration[0], astNode);
        }
    }    
    
    /**
     * @param  {OrdinaryCompilationUnitChildren} ordinaryCompilationUnitChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstImport(ordinaryCompilationUnitChildren: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        if(ordinaryCompilationUnitChildren.importDeclaration){
            new AstImportGenerationJavaService().generate(ordinaryCompilationUnitChildren.importDeclaration, astNode);
        }
    }    
    
    /**
     * @param  {OrdinaryCompilationUnitChildren} ordinaryCompilationUnitChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    generateAstTypeDeclaration(ordinaryCompilationUnitChildren: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        if(ordinaryCompilationUnitChildren.typeDeclaration){
            this.generateTypeDeclaration(ordinaryCompilationUnitChildren.typeDeclaration, astNode);
        }
    }
    
    /**
     * @param  {TypeDeclaration[]} typeDeclarationList
     * @param  {AstNodeInterface} typeDeclarationAstNode
     * @returns void
     */
    generateTypeDeclaration(typeDeclarationList: TypeDeclaration[], typeDeclarationAstNode: AstNodeInterface): void {
        typeDeclarationList.forEach(typeDeclaration => {
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(typeDeclaration);
            astNode.kind = SyntaxKind.typeIdentifier;
            if(typeDeclaration.children?.classDeclaration){
                new AstClassGenerationJavaService().generate(typeDeclaration.children.classDeclaration, astNode);
            }
            typeDeclarationAstNode.children.push(astNode);
        });
    }
}
