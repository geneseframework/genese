import { cstToAst } from '../cstToAst';
import { SwitchCase } from '../models/switch-case.model';
import { SwitchCaseChildren } from '../models/switch-case-children.model';

// @ts-ignore
export function run(cstNode: SwitchCase, children: SwitchCaseChildren) {
    const blockStatements = children.blockStatements;

    return {
        kind: 'CaseBlock',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...blockStatements.map(e => cstToAst(e))),
        ]
    };
}
