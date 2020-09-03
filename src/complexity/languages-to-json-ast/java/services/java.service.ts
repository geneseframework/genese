import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { Node } from '../models/node.model';
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
    static getAstNodeWithChildren(node: Node): AstNodeInterface {
        let astNode: AstNodeInterface;
        if(node?.location){
            astNode = {
                end: node.location.endOffset,
                kind: node.name,
                name: node.name,
                pos: node.location.startOffset,
                start: node.location.startOffset
            }
        }
        astNode.children = [];
        return astNode;
    }

    
    /**
     * @param  {Infos} infos
     * @param  {AstNodeInterface} astNode
     * @returns AstNodeInterface
     */
    static getAstNodeInfos(infos: Infos[], astNode: AstNodeInterface): AstNodeInterface {
        if(Array.isArray(infos)) {
            infos.forEach(info => {
                let childrenAstNode: AstNodeInterface = {
                    end: info.endOffset,
                    kind: info.image,
                    name: info.image,
                    pos: info.startOffset,
                    start: info.startOffset
                }
                if(astNode?.children){
                    astNode.children.push(childrenAstNode);
                }
            });
        }
        return astNode;
    }

}
