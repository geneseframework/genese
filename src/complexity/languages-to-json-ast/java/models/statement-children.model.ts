import { IfStatement } from "./if-statement-model";
import { StatementWithoutTrailingSubstatement } from "./statement-without-trailing-sub-statement.model";

export class StatementChildren {
    ifStatement?: IfStatement[] = [new IfStatement()];
    statementWithoutTrailingSubstatement?: StatementWithoutTrailingSubstatement[] = [new StatementWithoutTrailingSubstatement()];
}
