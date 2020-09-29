import { cstToAst } from "../cstToAst";
import { TryStatementChildren } from "../models/try-statement-children.model";
import { TryStatement } from "../models/try-statement.model";

// @ts-ignore
export function run(cstNode: TryStatement, children: TryStatementChildren) {
    const block = children.block;
    const catches = children.catches;
    const finallyBlock = children.finally;
    // const tryStatement = children.block;
    console.log("HERE THE TEST :", cstNode);

    return {
        kind: "TryStatement",
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...block.map((e) => cstToAst(e))),
            ...[].concat(...catches.map((e) => cstToAst(e))),
            ...[].concat(...finallyBlock.map((e) => cstToAst(e))),
        ],
    };
}
