import { cstToAst } from '../cst-to-ast';
import { Literal } from '../models/literal.model';
import { LiteralChildren } from '../models/literal.children.model';

// @ts-ignore
export function run(cstNode: Literal, children: LiteralChildren): any {
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
