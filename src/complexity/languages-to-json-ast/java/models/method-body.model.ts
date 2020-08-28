import { Location } from "./location.model";
import { MethodHeaderChildren } from "./method-header-children.model";

export class MethodBody {
    methodHeader?: MethodBody[];
    name ?= '';
    children?: MethodHeaderChildren = new MethodHeaderChildren();
    location?: Location = new Location();
}