import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const classModifier = children.classModifier;
    const normalClassDeclaration = children.normalClassDeclaration;

    return {
        kind: 'ClassDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            // ...classModifier.map(e => cstToAst(e)),
            ...[].concat(...normalClassDeclaration.map(e => cstToAst(e))),
        ]
    };
}
