import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const parenthesisExpression = children.parenthesisExpression;
    const fqnOrRefType = children.fqnOrRefType;

    return [
        ...parenthesisExpression?.map(e => cstToAst(e)) ?? [],
        ...[].concat(...fqnOrRefType?.map(e => cstToAst(e)) ?? []),
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
