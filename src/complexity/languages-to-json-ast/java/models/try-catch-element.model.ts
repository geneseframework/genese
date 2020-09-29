import { Location } from "./location.model";
import { TryCatchChildren } from "./try-catch-children.model";

export class TryCatchElement {
    name ?= '';
    children?: TryCatchChildren = new TryCatchChildren();
    location?: Location = new Location();
}
