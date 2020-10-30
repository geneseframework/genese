import { cstToAst } from '../cst-to-ast';
import { MethodModifier } from '../models/method-modifier.model';
import { MethodModifierChildren } from '../models/method-modifier-children.model';

// @ts-ignore
export function run(cstNode: MethodModifier, children: MethodModifierChildren): any {
    const annotation = children.annotation;
    
    return [
        ...[].concat(...annotation?.map(e => cstToAst(e)) ?? []),
    ];
}
