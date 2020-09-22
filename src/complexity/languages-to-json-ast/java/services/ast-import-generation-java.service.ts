import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { PackageOrTypeNameElement } from '../models/package-or-type-name-element.model';
import { ImportChildren } from '../models/import-children.model';
import { ImportDeclarationElement } from '../models/import-declaration-element.model';
import { PackageOrTypeNameChildren } from '../models/package-or-type-name-children.model';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';

/**
 * - Generate AstNode for imports from their Abstract Syntax Tree (AST)
 */
export class AstImportGenerationJavaService {

    /**
     * Gets the import Node
     * @param  {ImportDeclarationElement[]} importDeclarations
     * @param  {AstNodeInterface} importAstNodes
     * @returns AstNodeInterface
     */
    generate(importDeclaration: ImportDeclarationElement[], importAstNodes: AstNodeInterface): AstNodeInterface {
        return JavaService.generateAstNode(importDeclaration, importAstNodes, this.generateImportChildren.bind(this));
    }


    /**
     * Gets the import Node children
     * @param  {ImportChildren} importChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generateImportChildren(importChildren: ImportChildren, astNode: AstNodeInterface): void {
        if(importChildren) {
            JavaService.getAstNodeInfos(importChildren.Import, astNode);
            if(Array.isArray(importChildren.packageOrTypeName)){
                this.generatePackageOrTypeName(importChildren.packageOrTypeName[0], astNode);
            }
            JavaService.getAstNodeInfos(importChildren.Semicolon, astNode);
        }
    }


    /**
     * Gets the PackageOrTypeName Node
     * @param  {PackageOrTypeNameElement} packageOrTypeNameElement
     * @param  {AstNodeInterface} packageOrTypeNameAstNode
     * @returns AstNodeInterface
     */
    private generatePackageOrTypeName(packageOrTypeNameElement: PackageOrTypeNameElement, packageOrTypeNameAstNode: AstNodeInterface): AstNodeInterface {        
        if(packageOrTypeNameElement){
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(packageOrTypeNameElement);
            this.generatePackageOrTypeNameChldren(packageOrTypeNameElement.children, astNode);
            if(packageOrTypeNameAstNode?.children){
                packageOrTypeNameAstNode.children.push(astNode);
            }
        }
        return packageOrTypeNameAstNode;
    }

    
    /**
     * Gets the PackageOrTypeName children Node
     * @param  {PackageOrTypeNameChildren} packageOrTypeNameChildren
     * @param  {AstNodeInterface} packageOrTypeNameChildrenAstNode
     * @returns void
     */
    private generatePackageOrTypeNameChldren(packageOrTypeNameChildren: PackageOrTypeNameChildren, packageOrTypeNameChildrenAstNode: AstNodeInterface): void {
        if(packageOrTypeNameChildren) {
            JavaService.getAstNodeInfos(packageOrTypeNameChildren.Identifier, packageOrTypeNameChildrenAstNode, SyntaxKind.Identifier);
            JavaService.getAstNodeInfos(packageOrTypeNameChildren.Dot, packageOrTypeNameChildrenAstNode);
        }
    }

}
