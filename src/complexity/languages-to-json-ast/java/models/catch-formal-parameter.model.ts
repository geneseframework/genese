import { CatchFormalParameterChildren } from "./catch-formal-parameter-children.model";

export class CatchFormalParameter {
    name? = "";
    children?: CatchFormalParameterChildren = new CatchFormalParameterChildren();
    location?: Location = new Location();
}
