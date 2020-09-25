import { cstToAst } from '../cstToAst';
import { VariableInitializer } from '../models/variable-initializer.model';
import { VariableInitializerChildren } from '../models/variable-initializer-children.model';

// @ts-ignore
export function run(cstNode: VariableInitializer, children: VariableInitializerChildren) {
    return [
        ...[].concat(...children.expression?.map(e => cstToAst(e)) ?? [])
    ];
}
