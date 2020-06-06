export class DebugMock {

    aggregateElementAccess(a, b, c) {
        return c[a[b]];
        // return c[a][b];
    }
}
