import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { Java } from './java.service';
import { PackageDeclaration } from '../models/package-declaration.model';

/**
 * - Generate AstNode for package from their Abstract Syntax Tree (AST)
 */
export class AstPackageGenerationJavaService {

    /**
     * Gets the package Node
     * @param  {PackageDeclaration} packageDeclaration
     * @param  {AstNodeInterface} packageAstNode
     * @returns AstNodeInterface
     */
    generate(packageDeclaration: PackageDeclaration, packageAstNode: AstNodeInterface): AstNodeInterface {
        let astNode = Java.getAstNodeWithChildren(packageDeclaration);
        astNode.kind = SyntaxKind.PackageDeclaration; 
        
        if(packageDeclaration.children.Identifier){
            Java.getIdentifier(packageDeclaration.children.Identifier, astNode);
        }

        packageAstNode.children.push(astNode);
        return packageAstNode;
    }

}