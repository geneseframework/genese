import { ClassModifierChildren } from "./class-modifier-children.model";
import { Location } from "./location.model";

export class ClassModifierElement {
    name ?= '';
    children?: ClassModifierChildren = new ClassModifierChildren();
    location?: Location = new Location();
}
