import { FinallyChildren } from "./finally-children.model";

export class Finally {
    name? = "";
    children?: FinallyChildren = new FinallyChildren();
    location?: Location = new Location();
}
