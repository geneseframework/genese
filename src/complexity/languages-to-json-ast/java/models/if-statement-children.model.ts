import { Infos } from "./infos.model";
import { Statement } from "./statement.model";
import { Expression } from "./expression.model";

export class IfStatementChildren {
    If?: Infos[] = [new Infos()];
    LCurly?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    RCurly?: Infos[] = [new Infos()];
    statement?: Statement[] = [new Statement()];
}
