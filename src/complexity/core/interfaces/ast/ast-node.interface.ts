import { SyntaxKind } from '../../enum/syntax-kind.enum';
import { CpxFactors } from '../../models/cpx-factor/cpx-factors.model';
import { IdentifierType } from '../identifier-type.type';

export interface AstNodeInterface {

    children?: AstNodeInterface[];
    cpxFactors?: CpxFactors;
    end: number;
    kind: SyntaxKind;
    name?: string;
    pos: number;
    start?: number;
    type?: IdentifierType;

}
