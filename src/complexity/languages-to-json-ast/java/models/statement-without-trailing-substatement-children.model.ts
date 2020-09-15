import { SwitchStatement } from "./switch-statement.model";

export class StatementWithoutTrailingSubstatementChildren {
    switchStatement?: SwitchStatement[] = [new SwitchStatement()];
}
