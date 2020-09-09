import { Infos } from "./infos.model";
import { Expression } from "./expression.model";

export class SwitchStatementChildren {
    Switch?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    BBrace?: Infos[] = [new Infos()];
    switchBlock?: Infos[] = [new Infos()];
}
