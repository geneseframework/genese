import { cstToAst } from "../cst-to-ast";
import { SwitchStatement } from "../models/switch-statement.model";
import { SwitchStatementChildren } from "../models/switch-statement-children.model";
import { Catches } from "../models/catches.model";
import { CatchesChildren } from "../models/catches-children";

// @ts-ignoree
export function run(cstNode: Catches, children: CatchesChildren) {
    const catchClause = children.catchClause;
    return [
        ...[].concat(...(catchClause.map((e) => cstToAst(e)) ?? [])),
    ]

}
