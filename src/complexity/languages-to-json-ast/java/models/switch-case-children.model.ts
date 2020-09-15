import { SwitchLabel } from "./switch-label.model";
import { Location } from "./location.model";
import { ExpressionStatement } from "./expression-statement.model";
import { StatementExpression } from "./statement-expression.model";

export class SwitchCaseChildren {
    switchLabel?: SwitchLabel[] = [new SwitchLabel()];
    blockStatements?: [{
        name?: '',
        children?: {
            blockStatement?: [{
                name?: '',
                children?: {
                    statement?: [{
                        name?: '',
                        children?: {
                                statementWithoutTrailingSubstatement?: [{
                                    name?: '',
                                    children?: {
                                        expressionStatement?: [{
                                            name?: '',
                                            children?: {
                                                statementExpression?: StatementExpression[]
                                            }
                                            location?: Location
                                        }]
                                    }
                                    location?: Location
                                }]
                        }
                        location?: Location
                    }],
                }
                location?: Location
            }],
        },  
        location?: Location,
    }] = [{
        name: '',
        children: {
            blockStatement : [{
                name: '',
                children: {
                    statement: [{
                        name: '',
                        children: {
                            statementWithoutTrailingSubstatement: [{
                                name: '',
                                children: {
                                    expressionStatement: [{
                                        name: '',
                                        children: {
                                            statementExpression: [new StatementExpression()]
                                        },
                                        location: new Location()
                                    }],
                                },
                                location: new Location()
                            }]
                        },
                        location: new Location()
                    }],
                },
                location: new Location(),
            }]
        },
        location: new Location(),
    }]
}
