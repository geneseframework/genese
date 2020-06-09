import * as ts from 'typescript';

export enum TreeNodeContext {

    FUNCTION_EXPRESSION = ts.SyntaxKind.FunctionExpression,
    VARIABLE_DECLARATION = ts.SyntaxKind.VariableDeclaration,

}
