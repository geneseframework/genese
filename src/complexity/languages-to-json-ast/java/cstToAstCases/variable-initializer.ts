import { cstToAst } from '../cst-to-ast';
import { VariableInitializer } from '../models/variable-initializer.model';
import { VariableInitializerChildren } from '../models/variable-initializer-children.model';

// @ts-ignore
export function run(cstNode: VariableInitializer, children: VariableInitializerChildren): any {
    return [
        ...[].concat(...children.expression?.map(e => cstToAst(e)) ?? [])
    ];
}
