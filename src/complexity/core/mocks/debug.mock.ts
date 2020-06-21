export class DebugMock {

    ifNestedIf(a, b) {
        if (a) {
            if (b) {
                return 'c';
            }
            return 'b';
        }
    }

}
