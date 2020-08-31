import { Location } from "./location.model";
import { ResultChildren } from "./result-children.model";

export class Result {
    result?: Result = new Result();
    name?: '';
    children?: ResultChildren = new ResultChildren();
    location?: Location = new Location()
}
