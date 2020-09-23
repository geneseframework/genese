import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const statementWithoutTrailingSubstatement = children.statementWithoutTrailingSubstatement;
    const ifStatement = children.ifStatement;

    return [
        ...[].concat(...statementWithoutTrailingSubstatement?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...ifStatement?.map(e => cstToAst(e)) ?? [])
    ];
}
