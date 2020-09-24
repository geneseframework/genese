import { cstToAst } from '../cstToAst';
import { MethodHeader } from '../models/method-header.model';
import { MethodHeaderChildren } from '../models/method-header-children.model';

// @ts-ignore
export function run(cstNode: MethodHeader, children: MethodHeaderChildren) {
    const result = children.result;
    const methodDeclarator = children.methodDeclarator;

    return [
        ...[].concat(...result.map(e => cstToAst(e))),
        ...[].concat(...methodDeclarator.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'MethodHeader',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...result.map(e => cstToAst(e))),
    //         ...[].concat(...methodDeclarator.map(e => cstToAst(e))),
    //     ]
    // };
}
