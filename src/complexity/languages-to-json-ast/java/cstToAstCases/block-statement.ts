import { cstToAst } from '../cstToAst';
import { BlockStatement } from '../models/block-statement.model';
import { BlockStatementChildren } from '../models/block-statement-children.model';

// @ts-ignore
export function run(cstNode: BlockStatement, children: BlockStatementChildren) {
    return [
        ...[].concat(...children.statement?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...children.localVariableDeclarationStatement?.map(e => cstToAst(e)) ?? [])
    ];
}
