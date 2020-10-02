import { cstToAst } from '../cst-to-ast';
import { BlockStatements } from '../models/block-statements.model';
import { BlockStatementsChildren } from '../models/block-statements-children.model';

// @ts-ignore
export function run(cstNode: BlockStatements, children: BlockStatementsChildren): any {
    console.log(cstNode.children.blockStatement);

    return [
        ...[].concat(...children.blockStatement?.map(e => cstToAst(e)) ?? [])
    ];
}
