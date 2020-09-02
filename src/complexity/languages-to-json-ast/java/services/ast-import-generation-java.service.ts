import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { PackageOrTypeName } from '../models/package-or-type-name.model';
import { ImportChildren } from '../models/import-children.model';
import { ImportDeclarationElement } from '../models/import-declaration-element.model';

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
        importDeclaration.forEach(importDeclarationElement => {
            let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(importDeclarationElement);
            this.generateImportChildren(importDeclarationElement.children, astNode);
            if(importAstNodes?.children){
                importAstNodes.children.push(astNode);
            }
        });
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
            this.generatePackageOrTypeName(importChildren.packageOrTypeName[0], astNode);
            JavaService.getAstNodeInfos(importChildren.Semicolon, astNode);
        }
    }


    /**
     * Gets the PackageOrTypeName Node
     * @param  {PackageOrTypeName} packageOrTypeName
     * @param  {AstNodeInterface} packageOrTypeNameAstNode
     * @returns AstNodeInterface
     */
    private generatePackageOrTypeName(packageOrTypeName: PackageOrTypeName, packageOrTypeNameAstNode: AstNodeInterface): AstNodeInterface {        
        let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(packageOrTypeName);
        JavaService.getAstNodeInfos(packageOrTypeName.children.identifier, astNode);
        if(packageOrTypeNameAstNode?.children){
            packageOrTypeNameAstNode.children.push(astNode);
        }
        return packageOrTypeNameAstNode;
    }

}
