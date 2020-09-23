import { cstToAst } from '../cstToAst';


// @ts-ignore
export function run(cstNode, children) {
    const ternaryExpressions = children.ternaryExpression;

    return [...[].concat(...ternaryExpressions.map(e => cstToAst(e)))];
}
