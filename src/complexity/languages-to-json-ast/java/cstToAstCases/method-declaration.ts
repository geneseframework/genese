import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const methodHeader = children.methodHeader;
    const methodBody = children.methodBody;

    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...methodHeader.map(e => cstToAst(e)),
            ...methodBody.map(e => cstToAst(e)),
        ]
    };
}
