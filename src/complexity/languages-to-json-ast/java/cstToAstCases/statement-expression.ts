import { cstToAst } from '../cstToAst';
import { StatementWithoutTrailingSubstatement } from '../models/statement-without-trailing-sub-statement.model';
import { StatementWithoutTrailingSubstatementChildren } from '../models/statement-without-trailing-substatement-children.model';

// @ts-ignore
export function run(cstNode: StatementWithoutTrailingSubstatement, children: any) {
    const expression = children.expression;

    return [
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ]

    // return {
    //     kind: 'StatementExpression',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    //     ]
    // };
}
