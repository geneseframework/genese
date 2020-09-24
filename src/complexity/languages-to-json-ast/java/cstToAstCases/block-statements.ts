import { cstToAst } from '../cstToAst';
import { BlockStatements } from '../models/block-statements.model';
import { BlockStatementsChildren } from '../models/block-statements-children.model';

// @ts-ignore
export function run(cstNode: BlockStatements, children: BlockStatementsChildren) {
    return [
        ...[].concat(...children.blockStatement?.map(e => cstToAst(e)) ?? [])
    ];
}
