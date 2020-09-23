import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const expressions = children.expression;
    const statements = children.statement;

    return {
        kind: 'IfStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...[].concat(...expressions.map(e => cstToAst(e))),
            ...[].concat(...statements.map(e => cstToAst(e)))
        ]
    };
}
