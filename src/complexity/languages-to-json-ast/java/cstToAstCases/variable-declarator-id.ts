import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
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
