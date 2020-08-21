import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Java } from './java.service';
import { SyntaxKind } from '../core/syntax-kind.enum';

/**
 * - Generate AstNode for imports from their Abstract Syntax Tree (AST)
 */
export class AstImportGenerationJavaService {

    /**
     * Gets the package Node
     * @param node // AST Node
     */
    generate(node, importNodes): AstNodeInterface[]{
        node.forEach(child => {
            let astNode = Java.getAstNodeWithChildren(child);
            astNode.kind = SyntaxKind.import

            //identifiers
            if(child.children.packageOrTypeName[0].children.Identifier){
                Java.getIdentifier(child.children.packageOrTypeName[0].children.Identifier, astNode);
                importNodes.children.push(astNode);
            }
        });

        return importNodes;
    }
}