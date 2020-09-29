import { cstToAst } from "../cstToAst";
import { SwitchStatement } from "../models/switch-statement.model";
import { SwitchStatementChildren } from "../models/switch-statement-children.model";
import { Catches } from "../models/catches.model";
import { CatchesChildren } from "../models/catches-children";
import { CatchFormalParameterChildren } from '../models/catch-formal-parameter-children.model';
import { CatchFormalParameter } from '../models/catch-formal-parameter.model';

// @ts-ignoree
export function run(cstNode: CatchFormalParameter, children: CatchFormalParameterChildren) {
    const variableDeclaratorId = children.variableDeclaratorId;
    return [
        ...[].concat(...(variableDeclaratorId.map((e) => cstToAst(e)) ?? []))
    ];
}
