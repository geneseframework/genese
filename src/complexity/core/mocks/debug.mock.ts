export class DebugMock {

    orBetweenTwoBinaries(a, b, c, d) {
        if (a && b || c) {
            console.log('b');
        }
    }
}
