import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { NodeFeature } from '../enums/node-feature.enum';

export class FactorCategoryService {

    getNodeFeature(syntaxKind: SyntaxKind): NodeFeature {
        switch (syntaxKind) {
            case SyntaxKind.ArrayType:
            case SyntaxKind.Identifier:
            case SyntaxKind.UnionType:
                return NodeFeature.ATOMIC;
            case SyntaxKind.BinaryExpression:
                return NodeFeature.BINARY;
            case SyntaxKind.CatchClause:
            case SyntaxKind.IfStatement:
            case SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return NodeFeature.DECLARATION;
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return NodeFeature.FUNC;
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.Keyword:
            case SyntaxKind.NewExpression:
            case SyntaxKind.ReturnStatement:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.VoidKeyword:
                return NodeFeature.KEYWORD;
            case SyntaxKind.FirstLiteralToken:
            case SyntaxKind.Literal:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
                return NodeFeature.LITERAL;
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
