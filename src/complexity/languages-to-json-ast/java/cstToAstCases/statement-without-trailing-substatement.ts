import { cstToAst } from '../cstToAst';
import { StatementWithoutTrailingSubstatement } from '../models/statement-without-trailing-sub-statement.model';
import { StatementWithoutTrailingSubstatementChildren } from '../models/statement-without-trailing-substatement-children.model';

// @ts-ignore
export function run(cstNode: StatementWithoutTrailingSubstatement, children: StatementWithoutTrailingSubstatementChildren) {
    return [
        ...children.block?.map(e => cstToAst(e)) ?? [],
        ...children.returnStatement?.map(e => cstToAst(e)) ?? [],
        ...children.switchStatement?.map(e => cstToAst(e)) ?? []
    ];
}
