import { Location } from "./location.model";
import { BlockStatementsChildren } from "./block-statements-children.model";

export class BlockStatements {
    blockStatements?: BlockStatements[] = [new BlockStatements()];
    name ?= '';
    children?: BlockStatementsChildren = new BlockStatementsChildren();
    location?: Location = new Location();
}