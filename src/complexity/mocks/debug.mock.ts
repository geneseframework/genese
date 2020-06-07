import * as ts from 'typescript';

export class DebugMock {

    methodWithCallback(a, callback) {
        this.methodWithCallback(a + 3, 1);
    }


    // getNodeCount(node) {
    //     ts.forEachChild(node, function cb(childNode) {
    //         ts.forEachChild(childNode, cb);
    //     });
    // }

}
