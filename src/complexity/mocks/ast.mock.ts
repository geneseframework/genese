

export class AstMock {



    z(a) {
        for (let i of a) {
            for (let j of a) {
                console.log(a);
            }
        }
        if (a) {
            console.log('b');
        }
        return {cyclomaticValue: 2, cognitiveValue: 2};
    }
}
