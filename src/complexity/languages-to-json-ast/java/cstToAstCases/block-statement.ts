import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return children.statement?.map(e => cstToAst(e)) ?? [];
}
