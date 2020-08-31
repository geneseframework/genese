import { ClassModifierChildren } from "./class-modifier-children.model";
import { Location } from "./location.model";

export class ClassModifier {
    name ?= '';
    children?: ClassModifierChildren = new ClassModifierChildren();
    location?: Location = new Location();
}
