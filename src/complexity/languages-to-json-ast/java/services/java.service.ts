import { SyntaxKind } from '../core/syntax-kind.enum';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';

/**
 * Service contains common functions
 */
export class Java {

    /**
     * Gets the AstNode of Node
     * @param node // AST Node
     */
    static getAstNode(node): AstNodeInterface{
        let astNode: AstNodeInterface = {
            end: node.endOffset,
            kind: node.image,
            name: node.image,
            pos: node.startOffset,
            start: node.startOffset
        }
        return astNode;
    }

    /**
     * Gets astNode with children
     * @param node // AST Node
     */
    static getAstNodeWithChildren(node): AstNodeInterface{
        let astNode: AstNodeInterface = {
            end: node.location.endOffset,
            kind: node.location.name,
            name: node.location.image,
            pos: node.location.startOffset,
            start: node.location.startOffset
        }
        astNode.children = [];

        return astNode;
    }

    /**
     * Gets the lCurly Node
     * @param lCurly // AST Node
     */
    static getLCurly(lCurly, lCurlyAstNode): AstNodeInterface{
        let astNode = this.getAstNode(lCurly[0]);
        astNode.kind = SyntaxKind.LCurly;
        
        lCurlyAstNode.children.push(astNode);

        return lCurlyAstNode;
    }

    /**
     * Gets the rCurly Node
     * @param rCurly // AST Node
     */
    static getRCurly(rCurly, rCurlyAstNode): AstNodeInterface{
        let astNode = this.getAstNode(rCurly[0]);
        astNode.kind = SyntaxKind.RCurly;

        rCurlyAstNode.children.push(astNode);

        return rCurlyAstNode;
    }

    /**
     * Gets the identifier Node List
     * @param node // AST Node
     */
    static getIdentifier(node, identifierAstNode): AstNodeInterface[]{
        node.forEach(identifier =>{
            let astNode = this.getAstNode(identifier);
            astNode.kind = SyntaxKind.Identifier;
            identifierAstNode.children.push(astNode);
        });
        
        return identifierAstNode;
    }

    /**
     * Gets the annotation Node
     * @param annotation // AST Node
     */
    static getAnnotation(annotation, annotationAstNode): AstNodeInterface{
        let astNode = this.getAstNodeWithChildren(annotation[0]);
        astNode.kind = SyntaxKind.annotation;
        
        //At
        let atNode = this.getAtNode(annotation[0].children.At);
        astNode.children.push(atNode)

        //TypeName
        let typeNameNode = this.getTypeNameNode(annotation[0].children.typeName);
        astNode.children.push(typeNameNode)
       
        annotationAstNode.children.push(astNode);

        return annotationAstNode;
    }

    /**
     * Gets the At Node
     * @param atNode // AST Node
     */
    static getAtNode(node): AstNodeInterface{
        let astNode = this.getAstNode(node[0]);
        astNode.kind = SyntaxKind.At;

        return astNode;
    }

    /**
     * Gets the typeNameNode Node
     * @param typeNameNode // AST Node
     */
    static getTypeNameNode(typeNameNode): AstNodeInterface{
        let astNode = this.getAstNodeWithChildren(typeNameNode[0]);
        astNode.kind = SyntaxKind.typeName;

        //Identifier
        if(typeNameNode[0].children.Identifier) {
            this.getIdentifier(typeNameNode[0].children.Identifier, astNode);
        }
        
        return astNode;
    }

    

    /**
     * 
     * @param lBrace 
     */
    static getLBrace(lBrace, lBraceAstNode): AstNodeInterface{
        let astNode = this.getAstNode(lBrace[0]);
        astNode.kind = SyntaxKind.LBrace;

        lBraceAstNode.children.push(astNode);

        return lBraceAstNode;
    }

    /**
     * 
     * @param rBrace 
     */
    static getRBrace(rBrace, rBraceAstNode): AstNodeInterface{
        let astNode = this.getAstNode(rBrace[0]);
        astNode.kind = SyntaxKind.RBrace;

        rBraceAstNode.children.push(astNode);

        return rBraceAstNode;
    }
    
    /**
     * 
     * @param semicolon 
     * @param semicolonAstNode 
     */
    static getSemicolon(semicolon, semicolonAstNode): AstNodeInterface{
        let astNode = this.getAstNode(semicolon[0]);
        astNode.kind = SyntaxKind.semiColon;

        semicolonAstNode.children.push(astNode);

        return semicolonAstNode;
    }

    /**
     * 
     * @param importNode 
     * @param getImportAstNode 
     */
    static getImport(importNode, importAstNode): AstNodeInterface{
        let astNode = this.getAstNode(importNode[0]);
        astNode.kind = SyntaxKind.import;

        importAstNode.children.push(astNode);

        return importAstNode;
    }

    /**
     * 
     * @param child 
     */
    static getModificatorAstNode(child): AstNodeInterface{
        let astNode = Java.getAstNodeWithChildren(child);
        astNode.kind = SyntaxKind.methodModifier;
        
        
        if(child.children.Public){
            this.getModificator(child.children.Public[0], astNode);
        } else if(child.children.Private) {
            this.getModificator(child.children.Private[0], astNode);
        } else if(child.children.Static){
            this.getModificator(child.children.Static[0], astNode);
        } else if(child.children.Protected){
            this.getModificator(child.children.Protected[0], astNode); 
        }

        return astNode;
    }

    /**
     * 
     * @param node 
     * @param modificatorAstNode 
     */
    static getModificator(node, modificatorAstNode): AstNodeInterface{
        modificatorAstNode.children.push(this.getAstNode(node));

        return modificatorAstNode;
    }
}