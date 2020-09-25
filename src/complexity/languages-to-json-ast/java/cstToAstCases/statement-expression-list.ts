import { cstToAst } from '../cstToAst';
import { StatementExpressionList } from '../models/statement-expression-list.model';
import { StatementExpressionListChildren } from '../models/statement-expression-list-children.model';

// @ts-ignore
export function run(cstNode: StatementExpressionList, children: StatementExpressionListChildren) {
    const statementExpression = children.statementExpression;
    
    return [
        ...[].concat(...statementExpression?.map(e => cstToAst(e)) ?? [])
    ]
}
