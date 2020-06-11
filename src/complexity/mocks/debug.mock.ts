import { CallbacksMock } from './mocks-subfolder/callbacks.mock';

export class DebugMock {
    // hyperComplex<T>(object: Object, path: string | string[] = '', value: any): CallbacksMock<T> {
    //     path = path.toString().match(/[^.[\]]+/g);
    //     path.slice(0, -1).reduce((acc: Object, curr: any, index: number) => {
    //         const arg = Math.round(index) % 3;
    //         return Object(acc[curr]) === acc[curr + arg][0];
    //     }, object)[path[path.length - 1]] = value;
    //     return new CallbacksMock<T>(object);
    // }

    ifAlone(a) {
        return a('b');
    }
    //
    keycloakService;
    logout(a) {
        this.logout('b');
    }

}

function ctxt (a) {
    console.log(a('b'));
}
