import { Location } from "./location.model";
import { TypeIdentifierChildren } from "./type-identifier-Children.model";

export class TypeIdentifier {
    typeIdentifier?: TypeIdentifier[] = [new TypeIdentifier()];
    name ?= '';
    children?: TypeIdentifierChildren = new TypeIdentifierChildren();
    location?: Location = new Location();
}
