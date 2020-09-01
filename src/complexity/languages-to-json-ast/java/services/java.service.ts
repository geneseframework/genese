import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Infos } from '../models/infos.model';
import { Annotation } from '../models/annotation.model';
import { TypeIdentifier } from '../models/type-identifier.model';
import { AnnotationChildren } from '../models/annotation-children.model';

/**
 * Service contains common functions
 */
export class JavaService {

    /**
     * Gets astNode with children
     * @param node // AST Node
     */
    static getAstNodeWithChildren(node): AstNodeInterface{
        let astNode: AstNodeInterface = {
            end: node.location.endOffset,
            kind: node.name,
            name: node.name,
            pos: node.location.startOffset,
            start: node.location.startOffset
        }
        astNode.children = [];
        return astNode;
    }

}