import { cstToAst } from '../cstToAst';
import { NumericType } from '../models/numeric-type.model';
import { NumericTypeChildren } from '../models/numeric-type-children.model';

// @ts-ignore
export function run(cstNode: NumericType, children: NumericTypeChildren) {
    const integralType = children.integralType;
    const floatingPointType = children.floatingPointType;

    return [
        ...[].concat(...integralType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...floatingPointType?.map(e => cstToAst(e)) ?? []),
    ];

    // return {
    //     kind: 'NumericType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...integralType.map(e => cstToAst(e))),
    //     ]
    // };
}
