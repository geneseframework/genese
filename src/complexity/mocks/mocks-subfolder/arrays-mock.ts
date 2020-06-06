export class ArraysMock {

    elementAccessExpression(a) {
        return a[0];
    }


    arrayLiteralExpression(a, b) {
        return [b];
    }


    aggregateElementAccess(a, b, c) {
        return c[a][b];
    }


    aggregateArrayLiteral(a, b) {
        return [a][b];
    }


    nestingElementAccessElementAccess(a, b, c) {
        return a[b[c]];
    }


    nestingTernaryElementAccess(a, b, c, d) {
        return a[b ? c : d];
    }

}
