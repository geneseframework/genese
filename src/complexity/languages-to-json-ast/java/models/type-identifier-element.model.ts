import { Location } from "./location.model";
import { TypeIdentifierChildren } from "./type-identifier-Children.model";

export class TypeIdentifierElement {
    name ?= '';
    children?: TypeIdentifierChildren = new TypeIdentifierChildren();
    location?: Location = new Location();
}
