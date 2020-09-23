import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return [
        ...[].concat(...children.statement?.map(e => cstToAst(e)) ?? [])
    ];
}
