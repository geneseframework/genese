import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: Infos, children) {
    const astNode = {
        kind: 'Identifier',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
    setType(astNode);
    return astNode ;
}

function setType(astNode) {
    switch (astNode.name) {
        case 'forEach':
            astNode.type = 'function';
            return astNode;
    }
}