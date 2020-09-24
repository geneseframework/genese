import { cstToAst } from '../cstToAst';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

// @ts-ignore
export function run(cstNode: Primary, children: PrimaryChildren) {
    const primaryPrefix = children.primaryPrefix;

    return [
        ...[].concat(...primaryPrefix.map(e => cstToAst(e)))
    ]

    // return {
    //     kind: 'Primary',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...primaryPrefix.map(e => cstToAst(e))
    //     ]
    // };
}
