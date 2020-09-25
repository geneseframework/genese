import { cstToAst } from '../cstToAst';
import { UnaryExpression } from '../models/unary-expression.model';
import { UnaryExpressionChildren } from '../models/unary-expression-children.model';

// @ts-ignore
export function run(cstNode: UnaryExpression, children: UnaryExpressionChildren) {
    const unaryPrefixOperator = children.UnaryPrefixOperator;
    const primary = children.primary

    if (unaryPrefixOperator) {
        const unaryPrefixOperatorAst = unaryPrefixOperator.map(e => cstToAst(e, 'unaryPrefixOperator'));
        return toUnaryPrefixOperator(unaryPrefixOperatorAst, primary.map(e => cstToAst(e)))
    } else {
        return [
            // ...unaryPrefixOperator?.map(e => cstToAst(e, 'unaryPrefixOperator')) ?? [],
            ...[].concat(...primary.map(e => cstToAst(e)))
        ]
    }


    // return {
    //     kind: 'UnaryExpression',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         // cstToAst(unaryPrefixOperator, 'unaryPrefixOperator'),
    //         ...[].concat(...primary.map(e => cstToAst(e)))
    //     ]
    // };

    // if (unaryPrefixOperator) {
    //     const unaryPrefixOperatorAst = cstToAst(unaryPrefixOperator, 'unaryPrefixOperator');
    //     unaryPrefixOperatorAst.children.push(cstToAst(identifier, 'identifier'));
    //     return unaryPrefixOperatorAst;
    // } else {
    //     return cstToAst(identifier, 'identifier');
    // }
}


function toUnaryPrefixOperator(prefixes, primaries) {
    let res = undefined;
    let last = undefined;
    while (prefixes.length > 0) {
        const firstPrefix = prefixes.shift();
        if (!res) {
            last = firstPrefix;
            res = last;
        } else {
            last.children.push(firstPrefix);
            last = firstPrefix;
        }
    }
    last.children = [...[].concat(...primaries)];
    return res;
}
