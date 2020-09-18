import { SwitchStatement } from "./switch-statement.model";
import { ExpressionStatement } from "./expression-statement.model";
import { ReturnStatement } from "./return-statement.model";

export class StatementWithoutTrailingSubstatementChildren {
    switchStatement?: SwitchStatement[] = [new SwitchStatement()];
    expressionStatement?: ExpressionStatement[] = [new ExpressionStatement()];
    returnStatement?: ReturnStatement[] = [new ReturnStatement()];
}
