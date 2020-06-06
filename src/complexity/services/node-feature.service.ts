import * as ts from 'typescript';
import { NodeFeature } from '../enums/node-feature.enum';

export class NodeFeatureService {


    getFeature(node: ts.Node): NodeFeature {
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.FirstLiteralToken:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.TrueKeyword:
                return NodeFeature.BASIC;
            case ts.SyntaxKind.BinaryExpression:
                return NodeFeature.BINARY;
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.ElementAccessExpression:
            case ts.SyntaxKind.EndOfFileToken:
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.VariableDeclarationList:
            case ts.SyntaxKind.VariableStatement:
                return NodeFeature.EMPTY;
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.MethodDeclaration:
                return NodeFeature.FUNC;
            case ts.SyntaxKind.AmpersandAmpersandToken:
            case ts.SyntaxKind.BarBarToken:
                return NodeFeature.LOGIC_DOOR;
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.WhileStatement:
                return NodeFeature.LOOP;
            case ts.SyntaxKind.RegularExpressionLiteral:
                return NodeFeature.REGEX;
            case ts.SyntaxKind.ConditionalExpression:
                return NodeFeature.TERNARY;
            default:
                return NodeFeature.BASIC;
        }
    }
}
