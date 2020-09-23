import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const binaryExpressions = children.binaryExpression;

    return binaryExpressions.map(e => cstToAst(e));
}
