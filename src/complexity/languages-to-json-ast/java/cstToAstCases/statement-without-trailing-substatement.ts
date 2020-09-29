import { cstToAst } from '../cstToAst';
import { StatementWithoutTrailingSubstatement } from '../models/statement-without-trailing-sub-statement.model';
import { StatementWithoutTrailingSubstatementChildren } from '../models/statement-without-trailing-substatement-children.model';

// @ts-ignore
export function run(cstNode: StatementWithoutTrailingSubstatement, children: StatementWithoutTrailingSubstatementChildren) {
    const block = children.block;
    const returnStatement = children.returnStatement;
    const switchStatement = children.switchStatement;
    const expressionStatement = children.expressionStatement;

    return [
        ...block?.map(e => cstToAst(e)) ?? [],
        ...returnStatement?.map(e => cstToAst(e)) ?? [],
        ...switchStatement?.map(e => cstToAst(e)) ?? [],
        // ...expressionStatement?.map(e => cstToAst(e)) ?? [],
    ];
}
