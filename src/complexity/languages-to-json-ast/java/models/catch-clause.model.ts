import { CatchClauseChildren } from "./catch-clause-children.model";

export class CatchClause {
    name? = "";
    children?: CatchClauseChildren = new CatchClauseChildren();
    location?: Location = new Location();
}
