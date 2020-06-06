
export class DebugMock {


    iff(a) {
        if (a) {
            return a
        }
    }

    aggregateElementAccess(a, b, c) {
        return c[a];
    }


    nestingElementAccessElementAccess(a, b, c) {
        return a[b[c]];
    }


    nestingTernaryElementAccess(a, b, c, d) {
        return a[b ? c : d];
    }

}
