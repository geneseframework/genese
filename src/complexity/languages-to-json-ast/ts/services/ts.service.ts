import { KindAliases } from '../../const/kind.aliases.const';
import { Node, SyntaxKind } from 'ts-morph';
import { IdentifierType } from '../../../core/interfaces/identifier-type.type';

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
     * Returns the type of identifiers or parameters
     * @param node
     */
    static getType(node: Node): IdentifierType {
        switch (node.getKind()) {
            case SyntaxKind.Identifier:
            case SyntaxKind.Parameter:
                return Ts.getIdentifierType(node.compilerNode.getText());
            default:
                return undefined;
        }
    }


    /**
     * Returns the IdentifierType associated to a given string coming from compilerNode.getText()
     * @param compilerNodeText
     */
    private static getIdentifierType(compilerNodeText: string): IdentifierType {
        switch (compilerNodeText) {
            case 'Any':
            case 'Boolean':
            case 'Number':
            case 'Object':
            case 'String':
                return compilerNodeText.toLowerCase() as IdentifierType;
            default:
                return compilerNodeText.match(/=>/) ? 'function' : undefined;
        }

    }

}
