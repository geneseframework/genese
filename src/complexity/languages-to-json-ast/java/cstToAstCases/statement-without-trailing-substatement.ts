import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    return [
        ...children.block?.map(e => cstToAst(e)) ?? [],
        ...children.returnStatement?.map(e => cstToAst(e)) ?? []
    ];
}
