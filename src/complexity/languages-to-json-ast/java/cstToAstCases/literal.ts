import { cstToAst } from '../cstToAst';
import { Literal } from '../models/literal.model';
import { LiteralChildren } from '../models/literal.children.model';

// @ts-ignore
export function run(cstNode: Literal, children: LiteralChildren) {
    const integerLiteral = children.integerLiteral;

    return {
        kind: 'Literal',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        // children: [
        //     ...[].concat(...integerLiteral?.map(e => cstToAst(e)) ?? [])
        // ]
    };
}
