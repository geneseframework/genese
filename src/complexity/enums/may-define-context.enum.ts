import * as ts from 'typescript';

export enum MayDefineContext {

    CLASS_DECLARATION = ts.SyntaxKind.ClassDeclaration,
    FUNCTION_EXPRESSION = ts.SyntaxKind.FunctionExpression,
    IDENTIFIER = ts.SyntaxKind.Identifier,
    METHOD_DECLARATION = ts.SyntaxKind.MethodDeclaration,
    SOURCE_FILE = ts.SyntaxKind.SourceFile,
    VARIABLE_DECLARATION = ts.SyntaxKind.VariableDeclaration,

}
