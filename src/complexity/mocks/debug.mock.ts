export class DebugMock {

    recursion(a) {
        this.recursion(a);
    }


    methodWithCallback(a, callback) {
        callback(3);
    }
}
