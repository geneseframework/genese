import { KindAliases } from '../const/kind-aliases';
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
                return node.getText();
            default:
                return undefined;
        }
    }


    static getType(node: Node): IdentifierType {
        switch (node.getKind()) {
            case SyntaxKind.Identifier:
            case SyntaxKind.Parameter:
                console.log('GET TYPPPP', node.getKindName(), this.getName(node), node.getType().getText())
                return Ts.getIdentifierType(node.getType().getApparentType().getText());
            default:
                return undefined;
        }
    }


    private static getIdentifierType(text: string): IdentifierType {
        console.log('ID TYPEEEE', text)
        switch (text) {
            case 'Any':
            case 'Boolean':
            case 'Number':
            case 'Object':
            case 'String':
                return text.toLowerCase() as IdentifierType;
            default:
                return text.match(/=>/) ? 'function' : undefined;
        }

    }

}
