import { Literal } from '../models/literal.model';
import { LiteralChildren } from '../models/literal.children.model';
import { cstToAst } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode: Literal, children: LiteralChildren): any {
    const integerLiteral = children.integerLiteral;
    const booleanLiteral = children.booleanLiteral;

    return {
        kind: 'Literal',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            // ...[].concat(...booleanLiteral?.map(e => cstToAst(e)) ?? []),
            // ...[].concat(...integerLiteral?.map(e => cstToAst(e)) ?? []),
        ]
    };
}
