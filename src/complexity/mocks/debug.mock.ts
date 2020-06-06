import { CallbacksMock } from './mocks-subfolder/callbacks.mock';

export class DebugMock {


    // iff(a) {
    //     if (a) {
    //         return a
    //     }
    // }
    //
    aggregateElementAccess(a, b, c) {
        return c[a];
    }


    nestingElementAccessElementAccess(a, b, c) {
        return a[b[c]];
    }


    nestingTernaryElementAccess(a, b, c, d) {
        return a[b ? c : d];
    }



    nestingTernaryTernaryElementAccess(a, b, c, d) {
        return a[b ? c : d ? 0 : 1];
    }


    // hyperComplex<T>(object: Object, path: string | string[] = '', value: any): CallbacksMock<T> {
    //     path = path.toString().match(/[^.[\]]+/g);
    //     path.slice(0, -1).reduce((acc: Object, curr: any, index: number) => {
    //         const arg = Math.round(index) % 3;
    //         return Object(acc[curr]) === acc[curr + arg];
    //     }, object)[path[path.length - 1]] = value;
    //     return new CallbacksMock<T>(object);
    // }
}
