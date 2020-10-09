import { cstToAst } from '../cst-to-ast';
import { ConstructorBodyChildren } from '../models/constructor-body-children.model';
import { ConstructorBody } from '../models/constructor-body.model';

// @ts-ignore
export function run(cstNode: ConstructorBody, children: ConstructorBodyChildren): any {
    const blockStatements = children.blockStatements

    return [
        ...[].concat(...blockStatements?.map(e => cstToAst(e)) ?? []),
    ];
}
