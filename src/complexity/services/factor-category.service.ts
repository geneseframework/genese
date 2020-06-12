import * as ts from 'typescript';
import { FactorCategory } from '../enums/node-feature.enum';

export class FactorCategoryService {


    getFactorCategory(node: ts.Node): FactorCategory {
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.FirstLiteralToken:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.TrueKeyword:
                return FactorCategory.BASIC;
            case ts.SyntaxKind.BinaryExpression:
                return FactorCategory.BINARY;
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.SwitchStatement:
                return FactorCategory.CONDITIONAL;
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
                return FactorCategory.DECLARATION;
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.ElementAccessExpression:
            case ts.SyntaxKind.EndOfFileToken:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.VariableDeclarationList:
            case ts.SyntaxKind.VariableStatement:
                return FactorCategory.EMPTY;
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
                return FactorCategory.FUNC;
            case ts.SyntaxKind.AmpersandAmpersandToken:
            case ts.SyntaxKind.BarBarToken:
                return FactorCategory.LOGIC_DOOR;
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.WhileStatement:
                return FactorCategory.LOOP;
            case ts.SyntaxKind.RegularExpressionLiteral:
                return FactorCategory.REGEX;
            case ts.SyntaxKind.ConditionalExpression:
                return FactorCategory.TERNARY;
            default:
                return FactorCategory.BASIC;
        }
    }
}
