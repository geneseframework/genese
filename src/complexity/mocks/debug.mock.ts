import * as ts from 'typescript';

export class DebugMock {

    methodWithCallback(a, callback) {
        callback(a + 3);
    }


    getNodeCount(node) {
        ts.forEachChild(node, function cb(childNode) {
            ts.forEachChild(childNode, cb);
        });
    }

}
