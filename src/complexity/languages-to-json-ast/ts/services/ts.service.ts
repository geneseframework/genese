import { KindAliases } from '../const/kind-aliases';
import { Node, SyntaxKind } from 'ts-morph';

/**
 * Service for operations on TsNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
export class Ts {


    /**
     * Returns the SyntaxKind of an AST node or its alias if exists
     * @param node
     */
    static getKindAlias(node: Node): string {
        let kind = node.getKindName();
        for (const alias of KindAliases) {
            if (alias.aliases.includes(kind)) {
                kind = alias.name;
                break;
            }
        }
        return kind;
    }


    /**
     * Gets the name of the method of a node with type = MethodDeclaration
     * @param node // The AST node
     */
    static getName(node: Node): string {
        switch (node.getKind()) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Parameter:
                return node.compilerNode['name']?.['escapedText'] ?? '';
            case SyntaxKind.Identifier:
                return node.getText();
            default:
                return undefined;
        }
    }

}
