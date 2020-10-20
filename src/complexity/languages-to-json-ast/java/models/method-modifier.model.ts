import { Location } from "./location.model";
import { MethodModifierChildren } from "./method-modifier-children.model";

export class MethodModifier {
    methodModifier?: MethodModifier[] = [new MethodModifier()];
    name ?= '';
    children?: MethodModifierChildren = new MethodModifierChildren();
    location?: Location = new Location();
}
