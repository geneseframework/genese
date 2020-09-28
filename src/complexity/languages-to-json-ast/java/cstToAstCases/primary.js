"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const cstToAst_1 = require("../cstToAst");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;
    const primaryPrefixAst = [].concat(...(_a = primaryPrefix === null || primaryPrefix === void 0 ? void 0 : primaryPrefix.map(e => cstToAst_1.cstToAst(e))) !== null && _a !== void 0 ? _a : []);
    const primarySuffixAst = [].concat(...(_b = primarySuffix === null || primarySuffix === void 0 ? void 0 : primarySuffix.map(e => cstToAst_1.cstToAst(e))) !== null && _b !== void 0 ? _b : []);
    if (primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix')) {
        if (primaryPrefixAst.find(e => e.kind === 'ThisKeyword')) {
            return {
                kind: 'CallExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
                    {
                        kind: 'PropertyAccessExpression',
                        start: primaryPrefixAst.find(e => e.kind === 'ThisKeyword').start,
                        end: primarySuffixAst.find(e => e.kind === 'Identifier').end,
                        pos: primaryPrefixAst.find(e => e.kind === 'ThisKeyword').start,
                        children: [
                            primaryPrefixAst.find(e => e.kind === 'ThisKeyword'),
                            { ...primarySuffixAst.find(e => e.kind === 'Identifier'), type: 'function' }
                        ]
                    },
                    ...primarySuffixAst.find(e => e.kind === 'MethodInvocationSuffix').children
                ]
            };
        }
        else {
            return {
                kind: 'CallExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: [
                    { ...primarySuffixAst.find(e => e.kind === 'Identifier'), type: 'function' }
                ]
            };
        }
    }
    else {
        return [
            ...primaryPrefixAst,
            ...primarySuffixAst
        ];
    }
    // return {
    //     kind: 'Primary',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...primaryPrefix.map(e => cstToAst(e))
    //     ]
    // };
}
exports.run = run;
