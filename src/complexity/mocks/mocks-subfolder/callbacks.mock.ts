export class CallbacksMock<T> {


    constructor(object) {
    }

    recursion(a) {
        this.recursion(a);
    }


    caller(a) {
        this.methodWithCallback(a, (b) => {
            if (a < 2) {
                console.log(b)
            }
        })
    }


    callerFunction(a) {
        this.methodWithCallback(a, function (b) {
            if (b < 6) {
                console.log('b', b)
            }
        })
    }


    methodWithCallback(a, callback) {
        callback(a + 3);
    }

}
