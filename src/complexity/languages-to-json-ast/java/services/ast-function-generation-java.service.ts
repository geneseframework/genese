import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { MethodDeclaration } from '../models/method-declaration.model';
import { MethodDeclarationChildren } from '../models/method-declaration-children.model';
import { MethodHeader } from '../models/method-header.model';
import { MethodHeaderChildren } from '../models/method-header-children.model';
import { MethodDeclarator } from '../models/method-declarator.model';
import { MethodDeclaratorChildren } from '../models/method-declarator-children.model';
import { FormalParameterList } from '../models/formal-parameter-list.model';
import { FormalParameterListChildren } from '../models/formal-parameter-list-children.model';
import { VariableParaRegularParameter } from '../models/variable-para-regular-parameter.model';
import { VariableParaRegularParameterChildren } from '../models/variable-para-regular-parameter-children.model';
import { MethodModifier } from '../models/method-modifier.model';
import { MethodModifierChildren } from '../models/method-modifier-children.model';
import { Result } from '../models/result.model';
import { FormalParameter } from '../models/formal-parameter.model';
import { MethodBody } from '../models/method-body.model';

/**
 * - AstFunction generation from their Abstract Syntax Tree (AST)
 */
export class AstFunctionageGenerationJavaService {
    
    /**
     * Gets the methodDeclaration Node
     * @param  {MethodDeclaration[]} methodDeclarationList
     * @param  {AstNodeInterface} methodDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(_methodDeclarationList: MethodDeclaration[], methodDeclarationAstNode: AstNodeInterface): AstNodeInterface {
        return methodDeclarationAstNode;
    }
}