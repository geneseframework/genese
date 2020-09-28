import { cstToAst } from '../cst-to-ast';
import { StatementWithoutTrailingSubstatement } from '../models/statement-without-trailing-sub-statement.model';
import { StatementWithoutTrailingSubstatementChildren } from '../models/statement-without-trailing-substatement-children.model';
import { StatementExpression } from '../models/statement-expression.model';
import { StatementExpressionChildren } from '../models/statement-expression-children.model';

// @ts-ignore
export function run(cstNode: StatementExpression, children: StatementExpressionChildren): any {
    const expression = children.expression;

    return [
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ]
}
