import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { PackageOrTypeNameElement } from '../models/package-or-type-name-element.model';
import { ImportChildren } from '../models/import-children.model';
import { ImportDeclarationElement } from '../models/import-declaration-element.model';
import { PackageOrTypeNameChildren } from '../models/package-or-type-name-children.model';

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
        if(Array.isArray(importDeclaration)){
            importDeclaration.forEach(importDeclarationElement => {
                let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(importDeclarationElement);
                this.generateImportChildren(importDeclarationElement.children, astNode);
                if(importAstNodes?.children){
                    importAstNodes.children.push(astNode);
                }
            });
        }
        return importAstNodes;
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
            JavaService.getAstNodeInfos(packageOrTypeNameChildren.Identifier, packageOrTypeNameChildrenAstNode);
            JavaService.getAstNodeInfos(packageOrTypeNameChildren.Dot, packageOrTypeNameChildrenAstNode);
        }
    }

}
