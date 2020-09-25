import { cstToAst } from '../cstToAst';
import { LocalVariableDeclaration } from '../models/local-variable-declaration.model';
import { LocalVariableDeclarationChildren } from '../models/local-variable-declaration-children.model';

// @ts-ignore
export function run(cstNode: LocalVariableDeclaration, children: LocalVariableDeclarationChildren) {
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...children.localVariableType?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...children.variableDeclaratorList?.map(e => cstToAst(e)) ?? [])
        ]
    }
}
