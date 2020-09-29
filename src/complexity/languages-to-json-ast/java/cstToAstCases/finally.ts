import { cstToAst } from '../cst-to-ast';
import { ClassBodyElement } from '../models/class-body-element.model';
import { ClassBodyChildren } from '../models/class-body-children.model';
import { Finally } from '../models/finally.model';
import { FinallyChildren } from '../models/finally-children.model';

// @ts-ignore
export function run(cstNode: Finally, children: FinallyChildren) {
    const block = children.block;

    return {
        kind: 'Block',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [...[].concat(...block.map(e => cstToAst(e)))]
    }

}
