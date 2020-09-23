import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return [
        ...[].concat(...children.statementWithoutTrailingSubstatement?.map(e => cstToAst(e)) ?? [])
    ];
}
