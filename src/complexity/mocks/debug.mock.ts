export class DebugMock {


    ifAlone(a, b) {
        return a ? 1 : b ? 0 : 2;
    }

    ifAll(a, b) {
        if (a) {
            return 1;
        } else {
            return b ? 0 : 2;
        }
    }

    ifAll2(a, b) {
        if (a) {
            return 1;
        } else if (b) {
            return 0;
        } else {
            return 2;
        }
    }
}
