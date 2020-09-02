import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { JavaService } from './java.service';
import { PackageDeclarationElement } from '../models/package-declaration-element.model';
import { PackageDeclarationChildren } from '../models/package-declaration-children.model';

/**
 * - Generate AstNode for package from their Abstract Syntax Tree (AST)
 */
export class AstPackageGenerationJavaService {

    /**
     * Gets the package Node
     * @param  {PackageDeclarationElement} packageDeclaration
     * @param  {AstNodeInterface} packageAstNode
     * @returns AstNodeInterface
     */
    generate(packageDeclarationElement: PackageDeclarationElement, packageAstNode: AstNodeInterface): AstNodeInterface {
        let astNode: AstNodeInterface = JavaService.getAstNodeWithChildren(packageDeclarationElement);
        astNode.kind = SyntaxKind.PackageDeclaration;
        this.generatePackageChildren(packageDeclarationElement.children, astNode);
        if(packageAstNode?.children){
            packageAstNode.children.push(astNode);
        }
        return packageAstNode;
    }

    
    /**
     * @param  {PackageDeclarationChildren} packageDeclarationChildren
     * @param  {AstNodeInterface} astNode
     * @returns void
     */
    private generatePackageChildren(packageDeclarationChildren: PackageDeclarationChildren, astNode: AstNodeInterface): void {
        if(packageDeclarationChildren) {
            JavaService.getAstNodeInfos(packageDeclarationChildren.Package, astNode);
            JavaService.getAstNodeInfos(packageDeclarationChildren.Identifier, astNode);
            JavaService.getAstNodeInfos(packageDeclarationChildren.Dot, astNode);
            JavaService.getAstNodeInfos(packageDeclarationChildren.Semicolon, astNode);
        }
    }

}
