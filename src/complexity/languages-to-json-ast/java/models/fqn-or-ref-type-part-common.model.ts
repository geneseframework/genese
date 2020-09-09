import { Location } from "./location.model";
import { FqnOrRefTypePartCommonChildren } from "./fqn-or-ref-type-part-common-children.model";

export class fqnOrRefTypePartCommon {
    name ?= '';
    children?: FqnOrRefTypePartCommonChildren = new FqnOrRefTypePartCommonChildren();
    location?: Location = new Location();
}
