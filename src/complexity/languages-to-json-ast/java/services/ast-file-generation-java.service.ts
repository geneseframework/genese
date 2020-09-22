import { getFilename } from '../../../core/services/file.service';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { parse } from 'java-parser';
import { AstPackageGenerationJavaService } from './ast-package-generation-java.service';
import { AstImportGenerationJavaService } from './ast-import-generation-java.service';
import * as fs from 'fs-extra';
import { JavaService } from './java.service';
import { GeneseMapperService } from './genese-mapper.service';
import { CompilationUnit } from '../models/compilation-unit.model';
import { OrdinaryCompilationUnitChildren } from '../models/ordinary-compilation-unit-children.model';
import { OrdinaryCompilationUnit } from '../models/ordinary-compilation-unit.model';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { TypeDeclarationElement } from '../models/type-declaration-element.model';
import { TypeDeclarationChildren } from '../models/type-declaration-children.model';
import { AstClassGenerationJavaService } from './ast-class-generation-java.service';

import { SyntaxKind as TsSyntaxKind } from '../../../core/enum/syntax-kind.enum';

/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
export class AstFileGenerationJavaService {

    mapAstNode(astNode: AstNodeInterface): AstNodeInterface {
        if (astNode.kind === SyntaxKind.ifStatement) {
            console.log(astNode);
            astNode.kind = TsSyntaxKind.IfStatement;
        }

        astNode.children = astNode.children?.map(c => this.mapAstNode(c));

        return astNode;
    }


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
        const fileContent = fs.readFileSync(path, 'utf8');
        const compilationUnit: CompilationUnit = GeneseMapperService.getMappedCompilationUnit(parse(fileContent));
        return {
            name: getFilename(path),
            text: fileContent,
            astNode: this.mapAstNode(this.createAstNodeChildren(compilationUnit))
        };
    }


    /**
     * @param  {CompilationUnit} compilationUnit
     * @returns AstNodeInterface
     */
    private createAstNodeChildren(compilationUnit: CompilationUnit): AstNodeInterface {
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
    private generateAstPackageImportTypeDeclaration(children: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        this.generateAstPackage(children, astNode);
        this.generateAstImport(children, astNode);
        this.generateAstTypeDeclaration(children, astNode);
    }


    /**
     * @param  {OrdinaryCompilationUnitChildren} ordinaryCompilationUnitChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstPackage(ordinaryCompilationUnitChildren: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        if (ordinaryCompilationUnitChildren.packageDeclaration) {
            new AstPackageGenerationJavaService().generate(ordinaryCompilationUnitChildren.packageDeclaration[0], astNode);
        }
    }


    /**
     * @param  {OrdinaryCompilationUnitChildren} ordinaryCompilationUnitChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstImport(ordinaryCompilationUnitChildren: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        if (ordinaryCompilationUnitChildren.importDeclaration) {
            new AstImportGenerationJavaService().generate(ordinaryCompilationUnitChildren.importDeclaration, astNode);
        }
    }


    /**
     * @param  {OrdinaryCompilationUnitChildren} ordinaryCompilationUnitChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateAstTypeDeclaration(ordinaryCompilationUnitChildren: OrdinaryCompilationUnitChildren, astNode: AstNodeInterface): void {
        if (ordinaryCompilationUnitChildren.typeDeclaration) {
            this.generateTypeDeclaration(ordinaryCompilationUnitChildren.typeDeclaration, astNode);
        }
    }


    /**
     * Generate AstNode for typeDeclaration
     * @param  {TypeDeclarationElement[]} typeDeclaration
     * @param  {AstNodeInterface} typeDeclarationAstNode
     * @returns void
     */
    private generateTypeDeclaration(typeDeclaration: TypeDeclarationElement[], typeDeclarationAstNode: AstNodeInterface): void {
        JavaService.generateAstNode(typeDeclaration, typeDeclarationAstNode, this.generateTypeDeclarationChildren.bind(this));
    }


    /**
     * Generate AstNode for typeDeclaration children
     * @param  {TypeDeclarationChildren} typeDeclarationChildren
     * @param  {AstNodeInterface} typeDeclarationChildrenAstNode
     * @returns void
     */
    private generateTypeDeclarationChildren(typeDeclarationChildren: TypeDeclarationChildren, typeDeclarationChildrenAstNode: AstNodeInterface): void {
        new AstClassGenerationJavaService().generate(typeDeclarationChildren.classDeclaration, typeDeclarationChildrenAstNode);
    }

}
