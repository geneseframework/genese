import { cstToAst } from '../cstToAst';
import { UnannType } from '../models/unann-type.model';
import { UnannTypeChildren } from '../models/unann-type-children.model';

// @ts-ignore
export function run(cstNode: UnannType, children: UnannTypeChildren) {
    const unannPrimitiveType = children.unannPrimitiveType;

    return [
        ...[].concat(...unannPrimitiveType.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'UnannType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...unannPrimitiveType.map(e => cstToAst(e))),
    //     ]
    // };
}
