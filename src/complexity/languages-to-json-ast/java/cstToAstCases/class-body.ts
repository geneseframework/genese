import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const classBodyDeclaration = children.classBodyDeclaration;

    return [
        ...[].concat(...classBodyDeclaration.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'ClassBody',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...classBodyDeclaration.map(e => cstToAst(e))),
    //     ]
    // };
}
