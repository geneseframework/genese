
export class DebugMock {



    ifIfNested(a, b) {
        if (a) {
            return 'b';
            if (b) {
                return 'c';
            }
        }
    }

    recursion(a) {
        this.recursion(a);
    }


    methodWithCallback(a, callback) {
        callback(3);
    }

}
