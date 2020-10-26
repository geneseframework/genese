import { Node, SourceFile, ts } from 'ts-morph';

export class RefactorerUtils {
    static print(node: ts.Node, sourceFile: ts.SourceFile = node.getSourceFile()): void {
        try {
            const PRINTER = ts.createPrinter({
                newLine: ts.NewLineKind.LineFeed,
            });
            const OUTPUT = PRINTER.printNode(ts.EmitHint.Unspecified, node, sourceFile);
            console.log(OUTPUT);
        } catch (err) {
            console.error('Node cant be print', err);
        }
    }

    /**
     * Simple way to create method node
     * @param name the method name
     * @param block the method block node
     * @param parameters the method parameters
     * @returns {ts.MethodDeclaration}
     */
    static createSimpleMethod(name: string, block: ts.Block, parameters: ts.ParameterDeclaration[] = []): ts.MethodDeclaration {
        return ts.createMethod([], [], undefined, name, undefined, undefined, parameters, undefined, block);
    }

    /**
     * Simple way to create a parameter
     * @param identifier the parameter name
     * @param type the parameter type
     * @returns {ts.ParameterDeclaration}
     */
    static createSimpleParameter(identifier: string, type: ts.TypeNode): ts.ParameterDeclaration {
        return ts.createParameter([], [], undefined, identifier, undefined, type);
    }

    /**
     * Simple way to create a method call
     * @param name the method to call name
     * @param parameters the passed parameters
     * @returns {ts.CallExpression}
     */
    static createMethodCall(name: string, parameters: ts.Expression[] = []): ts.CallExpression {
        return ts.createCall(ts.createPropertyAccessChain(ts.createThis(), undefined, ts.createIdentifier(name)), [], parameters);
    }
}
