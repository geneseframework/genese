import { KindAlias } from '../ts/models/kind-alias';

export const KindAliases: KindAlias[] = [
    {
        name: 'Keyword',
        aliases: ['AnyKeyword', 'CaseClause', 'DefaultClause', 'FalseKeyword', 'NewExpression', 'ReturnStatement', 'StringKeyword', 'TrueKeyword', 'VariableStatement', 'VoidKeyword']
    },
    {
        name: 'Literal',
        aliases: ['FirstLiteralToken', 'NumericLiteral', 'StringLiteral']
    }
];

