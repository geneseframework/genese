import { cstToAst } from '../cstToAst';
import { UnannPrimitiveType } from '../models/unann-primitive-type.model';
import { UnannPrimitiveTypeChildren } from '../models/unann-primitive-type-children.model';

// @ts-ignore
export function run(cstNode: UnannPrimitiveType, children: UnannPrimitiveTypeChildren) {
    const numericType = children.numericType;

    return [
        ...[].concat(...numericType?.map(e => cstToAst(e)) ?? []),
    ]

    // return {
    //     kind: 'UnannPrimitiveType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...numericType.map(e => cstToAst(e))),
    //     ]
    // };
}
