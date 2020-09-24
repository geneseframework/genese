import { cstToAst } from '../cstToAst';
import { ClassBodyElement } from '../models/class-body-element.model';
import { ClassBodyChildren } from '../models/class-body-children.model';

// @ts-ignore
export function run(cstNode: ClassBodyElement, children: ClassBodyChildren) {
    const classBodyDeclaration = children.classBodyDeclaration;

    return [
        ...[].concat(...classBodyDeclaration.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'ClassBody',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...classBodyDeclaration.map(e => cstToAst(e))),
    //     ]
    // };
}
