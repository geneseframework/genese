import { KindAliases } from '../../globals.const';
import { Node, SyntaxKind } from 'ts-morph';

/**
 * Service for operations on Node elements (ts-morph nodes)
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
     * Gets the name of a Node
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
                return node.compilerNode['escapedText'];
            default:
                return undefined;
        }
    }


    /**
     * Checks if a node is a call to a function or method
     * Example : a.slice(1)
     * @param node      // The node to check
     */
    static isFunctionCall(node: Node): boolean {
        return node?.getParent()?.getParent()?.getKind() === SyntaxKind.CallExpression && Ts.isSecondSon(node);
    }


    /**
     * Checks is a given node is the second son of its parent
     * @param node      // The node to check
     */
    private static isSecondSon(node: Node): boolean {
        if (!node?.getParent()) {
            return false;
        }
        return node?.getChildIndex() === 2;
    }

}
