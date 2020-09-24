import { cstToAst, getBinaryOperatorName } from '../cstToAst';
import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: Infos, children) {
    return {
        kind: getBinaryOperatorName(cstNode.image),
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
    };
}
