import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return [
        ...[].concat(...children.blockStatement?.map(e => cstToAst(e)) ?? [])
    ];
}
