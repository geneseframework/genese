import { SyntaxKind } from '../enums/syntax-kind.enum';
import { NodeFeature } from '../enums/node-feature.enum';

export class NodeFeatureService {


    getNodeFeature(syntaxKind: SyntaxKind): NodeFeature {
        switch (syntaxKind) {
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.FirstLiteralToken:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.TrueKeyword:
                return NodeFeature.BASIC;
            case SyntaxKind.BinaryExpression:
                return NodeFeature.BINARY;
            case SyntaxKind.CatchClause:
            case SyntaxKind.IfStatement:
            case SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return NodeFeature.DECLARATION;
            case SyntaxKind.Block:
            case SyntaxKind.CallExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.EndOfFileToken:
            case SyntaxKind.ExpressionStatement:
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.VariableDeclarationList:
            case SyntaxKind.VariableStatement:
                return NodeFeature.EMPTY;
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return NodeFeature.FUNC;
            case SyntaxKind.AmpersandAmpersandToken:
            case SyntaxKind.BarBarToken:
                return NodeFeature.LOGIC_DOOR;
            case SyntaxKind.DoStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WhileStatement:
                return NodeFeature.LOOP;
            case SyntaxKind.RegularExpressionLiteral:
                return NodeFeature.REGEX;
            case SyntaxKind.ConditionalExpression:
                return NodeFeature.TERNARY;
            default:
                return NodeFeature.BASIC;
        }
    }
}
