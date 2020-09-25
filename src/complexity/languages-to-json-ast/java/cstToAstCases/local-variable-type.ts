import { cstToAst } from '../cstToAst';
import { LocalVariableType } from '../models/local-variable-type.model';
import { LocalVariableTypeChildren } from '../models/local-variable-type-children.model';

// @ts-ignore
export function run(cstNode: LocalVariableType, children: LocalVariableTypeChildren) {
    return [
        ...[].concat(...children.unannType?.map(e => cstToAst(e)) ?? [])
    ];
}
