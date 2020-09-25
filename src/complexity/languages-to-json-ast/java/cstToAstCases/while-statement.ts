import { cstToAst } from '../cstToAst';
import { IfStatement } from '../models/if-statement.model';
import { IfStatementChildren } from '../models/if-statement-children.model';
import { WhileStatementChildren } from '../models/while-statement-children.model';

// @ts-ignore
export function run(cstNode: IfStatement, children: WhileStatementChildren) {
    const expressions = children.expression;
    const statements = children.statement;

    return {
        kind: 'WhileStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expressions.map(e => cstToAst(e)) ?? []),
            ...[].concat(...statements.map(e => cstToAst(e)) ?? [])
        ]
    };
}
