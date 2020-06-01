

export class DebugMock {


    r(a, b, c) {
        if (a && b || c) {
            console.log('b');
        }
    }

    o(a, b, c) {
        if ((a && b) || c) {
            console.log('b');
        }
    }

    p(a, b, c, d) {
        if ((a && b) || (c && d)) {
            console.log('b');
        }
    }

    l(a, b, c, d) {
        if ((a && b) || (c && d) && a) {
            console.log('b');
        }
    }

    //
    // set(object: Object, path: string | string[] = '', value: any): Object {
    //     if (!object) {
    //         return undefined;
    //     }
    //     if (!Array.isArray(path)) {
    //         path = path.toString().match(/[^.[\]]+/g) || [];
    //     }
    //     path.slice(0, -1).reduce((acc: Object, curr: any, index: number) => {
    //         return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    //     }, object)[path[path.length - 1]] = value; // Finally assign the value to the last key
    //     return object; // Return the top-level object to allow chaining
    // }
}
