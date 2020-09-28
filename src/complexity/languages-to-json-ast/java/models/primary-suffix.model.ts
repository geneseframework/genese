import { Location } from "./location.model";
import { PrimaryPrefixChildren } from "./primary-prefix-children.model";
import { PrimarySuffixChildren } from './primary-suffix-children.model';

export class PrimarySuffix {
    name ?= '';
    children?: PrimarySuffixChildren = new PrimarySuffixChildren();
    location?: Location = new Location();
}
