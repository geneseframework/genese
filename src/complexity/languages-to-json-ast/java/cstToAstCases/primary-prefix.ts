import { cstToAst } from '../cstToAst';
import { PrimaryPrefix } from '../models/primary-prefix.model';
import { PrimaryPrefixChildren } from '../models/primary-prefix-children.model';

// @ts-ignore
export function run(cstNode: PrimaryPrefix, children: PrimaryPrefixChildren) {
    const parenthesisExpression = children.parenthesisExpression;
    const fqnOrRefType = children.fqnOrRefType;
    const literal = children.literal;

    return [
        ...[].concat(...parenthesisExpression?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...fqnOrRefType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...literal?.map(e => cstToAst(e)) ?? []),
    ]

    // return {
    //     kind: 'PrimaryPrefix',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...parenthesisExpression?.map(e => cstToAst(e)) ?? [],
    //         ...fqnOrRefType?.map(e => cstToAst(e)) ?? [],
    //     ]
    // };
}
