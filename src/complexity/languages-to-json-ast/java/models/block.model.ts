import { BlockChildren } from "./block-children.model";

export class Block {
    block?: Block[];
    name ?= '';
    children?: BlockChildren = new BlockChildren();
    location?: Location = new Location();
}