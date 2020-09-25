import { cstToAst } from '../cstToAst';
import { VariableDeclarator } from '../models/variable.declarator.model';
import { VariableDeclaratorChildren } from '../models/variable-declarator.children.model';

// @ts-ignore
export function run(cstNode: VariableDeclarator, children: VariableDeclaratorChildren) { 
    return {
        kind: 'VariableDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
        ...[].concat(...children.variableDeclaratorId?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...children.variableInitializer?.map(e => cstToAst(e)) ?? [])
        ]
    }
}
