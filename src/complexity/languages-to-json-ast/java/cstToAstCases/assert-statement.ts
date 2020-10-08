import { cstToAst } from '../cst-to-ast';
import { AssertStatement } from '../models/assert-statement.model';
import { AssertStatementChildren } from '../models/assert-statement-children.model';

// @ts-ignore
export function run(cstNode: AssertStatement, children: AssertStatementChildren): any {
    const assert = children.Assert;
    const expression = children.expression;
    
    console.log(assert);
    console.log(expression);
    
    return [
        ...[].concat(...assert?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ];
}
