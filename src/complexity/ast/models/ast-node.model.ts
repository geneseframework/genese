import { AstKind } from '../enums/ast-kind.enum';

export class AstNode {

    children?: AstNode[] = [];
    end ?= 0;
    kind?: AstKind = undefined;
    pos ?= 0;

}
