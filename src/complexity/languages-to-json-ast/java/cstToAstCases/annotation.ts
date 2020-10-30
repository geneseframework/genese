import { cstToAst } from '../cst-to-ast';
import { AnnotationElement } from '../models/annotation-element.model';
import { AnnotationChildren } from '../models/annotation-children.model';

// @ts-ignore
export function run(cstNode: AnnotationElement, children: AnnotationChildren): any {
    const typeName = children.typeName;
    console.log(typeName);
    
    return [
        ...[].concat(...typeName?.map(e => cstToAst(e)) ?? []),
    ];
}
