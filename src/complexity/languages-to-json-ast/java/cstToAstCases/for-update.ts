import { cstToAst } from '../cstToAst';
import { ForUpdate } from '../models/for-update.model';
import { ForUpdateChildren } from '../models/for-update-children.model';

// @ts-ignore
export function run(cstNode: ForUpdate, children: ForUpdateChildren) {
    const statementExpressionList = children.statementExpressionList;
    
    return [
        ...[].concat(...statementExpressionList?.map(e => cstToAst(e)) ?? [])
    ]
}
