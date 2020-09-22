const {
    BaseJavaCstVisitorWithDefaults
} = require("java-parser");

export class Collector extends BaseJavaCstVisitorWithDefaults {
    constructor() {
        super();
        this.customResult = {};
        this.validateVisitor();
    }


    ifStatement(ctx) {
        this.customResult = {
            kind: 'IfStamement',
            start: 1,
            end: 2,
            pos: 3,
            children: []
        }

        const binaryExpression = ctx.expression[0].children.ternaryExpression[0].children.binaryExpression[0];
        const binaryExpressionIdentifiersNames = this.getBinaryExpressionIdentifiersNames(binaryExpression);
        console.log(this.visit(binaryExpression));
        const expression = {
            kind: binaryExpression.name,
            start: 1,
            end: 2,
            pos: 3,
            children: [
                {
                    kind: 'Identifier',
                    name: binaryExpressionIdentifiersNames[0]
                },
                {
                    kind: binaryExpression.children.BinaryOperator[0].tokenType.name
                },
                {
                    kind: 'Identifier',
                    name: binaryExpressionIdentifiersNames[1]
                }
            ]
        }
        this.customResult.children.push(expression);

    }

    unaryExpression(ctx) {
        return {
            start: 1,
            end: 2,
            pos: 3,
            name: ctx.primary[0].children.primaryPrefix[0].children.fqnOrRefType[0].children.fqnOrRefTypePartFirst[0].children.fqnOrRefTypePartCommon[0].children.Identifier[0].image
        }
    }

    getBinaryExpressionIdentifiersNames(binaryExpression): String[] {
        return binaryExpression.children.unaryExpression.map(exp => {
            return exp.children.primary[0].children.primaryPrefix[0].children.fqnOrRefType[0].children.fqnOrRefTypePartFirst[0].children.fqnOrRefTypePartCommon[0].children.Identifier[0].image
        })
    }
}
