import { cstToAst } from '../cstToAst';
import { LocalVariableDeclarationStatement } from '../models/local-variable-declaration-statement.model';
import { LocalVariableDeclarationStatementChildren } from '../models/local-variable-declaration-statement-children.model';

// @ts-ignore
export function run(cstNode: LocalVariableDeclarationStatement, children: LocalVariableDeclarationStatementChildren) {
    return [
        ...[].concat(...children.localVariableDeclaration?.map(e => cstToAst(e)) ?? [])
    ];
}
