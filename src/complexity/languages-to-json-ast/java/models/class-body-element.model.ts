import { Location } from "./location.model";
import { ClassBodyChildren } from "./class-body-children.model";

export class ClassBodyElement {
    name ?= '';
    children?: ClassBodyChildren = new ClassBodyChildren();
    location?: Location = new Location();
}
