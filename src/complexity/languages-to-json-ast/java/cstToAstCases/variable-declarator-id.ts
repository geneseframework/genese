import { cstToAst } from '../cstToAst';
import { VariableDeclaratorId } from '../models/variable-declarator-id.model';
import { VariableDeclaratorIdChildren } from '../models/variable-declarator-id-children.model';

// @ts-ignore
export function run(cstNode: VariableDeclaratorId, children: VariableDeclaratorIdChildren) {
    const identifier = children.Identifier;

    return [
        ...identifier.map(e => cstToAst(e, 'identifier'))
    ];

    // return {
    //     kind: 'VariableDeclaratorId',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,

    // };
}
