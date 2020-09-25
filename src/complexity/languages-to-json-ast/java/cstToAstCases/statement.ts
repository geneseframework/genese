import { cstToAst } from '../cstToAst';
import { Statement } from '../models/statement.model';
import { StatementChildren } from '../models/statement-children.model';

// @ts-ignore
export function run(cstNode: Statement, children: StatementChildren) {
    const statementWithoutTrailingSubstatement = children.statementWithoutTrailingSubstatement;
    const ifStatement = children.ifStatement;
    const whileStatement = children.whileStatement;

    return [
        ...[].concat(...statementWithoutTrailingSubstatement?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...ifStatement?.map(e => cstToAst(e)) ?? []),
        ...whileStatement?.map(e => cstToAst(e)) ?? [],
    ];
}
