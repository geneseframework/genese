import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { JavaService } from './java.service';
import { AstFunctionageGenerationJavaService } from './ast-function-generation-java.service';
import { ClassDeclaration } from '../models/class-declaration.model';
import { ClassModifier } from '../models/class-modifier.model';
import { NormalClassDeclaration } from '../models/normal-class-declaration.model';
import { ClassBody } from '../models/class-body.model';
import { ClassBodyDeclaration } from '../models/class-body-declaration.model';
import { ClassMemberDeclaration } from '../models/class-member-declaration.model';
import { NormalClassDeclarationChildren } from '../models/normal-class-declaration-children.model';
import { ClassBodyChildren } from '../models/class-body-children.model';
import { ClassModifierChildren } from '../models/class-modifier-children.model';
import { ClassDeclarationChildren } from '../models/class-declaration-children.model';

/**
 * - Generate AstNode for class from their Abstract Syntax Tree (AST)
 */
export class AstClassGenerationJavaService {

    /**
     * Gets the classDeclaration Node List
     * @param  {ClassDeclaration[]} classDeclarationList
     * @param  {AstNodeInterface} classDeclarationAstNode
     * @returns AstNodeInterface
     */
    generate(_classDeclarationList: ClassDeclaration[], classDeclarationAstNode: AstNodeInterface): AstNodeInterface{
        return classDeclarationAstNode;
    }
}