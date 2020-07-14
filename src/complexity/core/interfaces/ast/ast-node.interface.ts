import { SyntaxKind } from '../../enum/syntax-kind.enum';

export interface AstNodeInterface {

    children?: AstNodeInterface[];
    end: number;
    kind: SyntaxKind;
    name?: string;
    pos: number;
    start?: number;

}
