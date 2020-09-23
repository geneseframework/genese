import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const result = children.result;
    const methodDeclarator = children.methodDeclarator;

    return [
        ...[].concat(...result.map(e => cstToAst(e))),
        ...[].concat(...methodDeclarator.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'MethodHeader',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...result.map(e => cstToAst(e))),
    //         ...[].concat(...methodDeclarator.map(e => cstToAst(e))),
    //     ]
    // };
}
