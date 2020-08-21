import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../core/syntax-kind.enum';
import { Java } from './java.service';

/**
 * - Generate AstNode for package from their Abstract Syntax Tree (AST)
 */
export class AstPackageGenerationJavaService {

    /**
     * Gets the package Node
     * @param node // AST Node
     */
    generate(node, packageNode): AstNodeInterface {
        let astNode = Java.getAstNodeWithChildren(node);
        astNode.kind = SyntaxKind.PackageDeclaration; 
        
        //Identifier
        if(node.children.Identifier){
            Java.getIdentifier(node.children.Identifier, astNode);
        }

        packageNode.children.push(astNode);
        return packageNode;
    }

}