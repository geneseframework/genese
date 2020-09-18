import { FqnOrRefType } from "./fqn-or-ref-type.model";
import { Literal } from "./literal.model";

export class PrimaryPrefixChildren {
    fqnOrRefType?: FqnOrRefType[] = [new FqnOrRefType()];
    literal?: Literal[] = [new Literal()];
}
