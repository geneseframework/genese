import { cstToAst } from '../cstToAst';
import { ForStatement } from '../models/for-statement.model';
import { ForStatementChildren } from '../models/for-statement-children.model';

// @ts-ignore
export function run(cstNode: ForStatement, children: ForStatementChildren) {
    const basicForStatement = children.basicForStatement;
    const enhancedForStatement = children.enhancedForStatement;

    return {
        kind: 'ForStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...basicForStatement?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...enhancedForStatement?.map(e => cstToAst(e)) ?? []),
        ]
    };
}
