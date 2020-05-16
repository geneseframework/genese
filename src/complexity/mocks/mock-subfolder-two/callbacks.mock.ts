
export class CallbacksMock {

    caller(a) {
        this.methodWithCallback(a, (b) => {
            if (a < 2) {
                console.log(b)
            }
        })
        return {cyclomaticValue: 3, cognitiveValue: 3};
    }


    callerFunction(a) {
        this.methodWithCallback(a, function (b) {
            if (b < 6) {
                console.log('b', b)
            }
        })
        return {cyclomaticValue: 3, cognitiveValue: 3};
    }


    methodWithCallback(a, callback) {
        callback(a + 3);
        return {cyclomaticValue: 0, cognitiveValue: 0};
    }

}
