import { Location } from './location.model';
import { TypeArgumentsOrDiamondChildren } from './type-arguments-or-diamond-children';

export class TypeArgumentsOrDiamond {
    name ?= '';
    children?: TypeArgumentsOrDiamondChildren = new TypeArgumentsOrDiamondChildren();
    location?: Location = new Location();
}
