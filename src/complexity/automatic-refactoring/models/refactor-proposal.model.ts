import { Transformer } from './transformer.model';

export class RefactorProposal {
    title?: string = '';
    oldCode?: string = '';
    newCode?: string = '';
    id: string = '';
    usedTransformer?: Transformer;
}
