import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const result = children.result;
    const methodDeclarator = children.methodDeclarator;

    return {
        kind: 'MethodHeader',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...result.map(e => cstToAst(e)),
            ...methodDeclarator.map(e => cstToAst(e)),
        ]
    };
}
