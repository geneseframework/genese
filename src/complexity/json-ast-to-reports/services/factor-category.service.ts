import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { NodeFeature } from '../enums/node-feature.enum';

export class FactorCategoryService {

    getNodeFeature(syntaxKind: SyntaxKind): NodeFeature {
        switch (syntaxKind) {
            case SyntaxKind.CaseClause:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.FirstLiteralToken:
            case SyntaxKind.Identifier:
            case SyntaxKind.Keyword:
            case SyntaxKind.Literal:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.ReturnStatement:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.VoidKeyword:
                return NodeFeature.ATOMIC;
            case SyntaxKind.BinaryExpression:
                return NodeFeature.BINARY;
            case SyntaxKind.CatchClause:
            case SyntaxKind.IfStatement:
            case SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
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
                return NodeFeature.EMPTY;
        }
    }
}
