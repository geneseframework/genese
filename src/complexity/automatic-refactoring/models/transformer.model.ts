import { Node, TransformTraversalControl, ts } from 'ts-morph';

export class Transformer {
    node: Node;
    transformer: (traversal: TransformTraversalControl) => ts.Node;
}
