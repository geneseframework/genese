import { cstToAst } from '../cstToAst';
import { LambdaBody } from '../models/lambda-body.model';
import { LambdaBodyChildren } from '../models/lambda-body-children.model';

// @ts-ignore
export function run(cstNode: LambdaBody, children: LambdaBodyChildren) {
    const block = children.block;

    return [
        ...block.map(e => cstToAst(e)) ?? []
    ]
}
