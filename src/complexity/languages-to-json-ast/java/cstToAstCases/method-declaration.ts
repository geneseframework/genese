import { cstToAst } from '../cst-to-ast';
import { MethodDeclaration } from '../models/method-declaration.model';
import { MethodDeclarationChildren } from '../models/method-declaration-children.model';

// @ts-ignore
export function run(cstNode: MethodDeclaration, children: MethodDeclarationChildren, ignoretest = false): any {
    const methodHeader = children.methodHeader;
    const methodBody = children.methodBody;
    const methodModifier = children.methodModifier;

    const methodHeaderAst = methodHeader.map(e => cstToAst(e));
    const methodModifierAst = [].concat(...methodModifier?.map(e => cstToAst(e)));
    const identifier = methodModifierAst.filter(e => e.kind === 'Identifier');
    
    if(identifier) {
        return []
    }
    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        name: getName(methodHeaderAst),
        children: [
            ...[].concat(...methodHeaderAst),
            ...[].concat(...methodBody.map(e => cstToAst(e))),
        ]
    };
}

function getName(methodHeaderAst): string {
    return methodHeaderAst?.[0]?.[1]?.name ?? '';
}
