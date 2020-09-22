import { Infos } from "./infos.model";
import { Statement } from "./statement.model";
import { Expression } from "./expression.model";

export class IfStatementChildren {
    If?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    RBrace?: Infos[] = [new Infos()];
    statement?: Statement[] = [new Statement()];
}
