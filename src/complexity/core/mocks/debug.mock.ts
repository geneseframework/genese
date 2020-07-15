import * as _ from 'lodash';
import { CallbacksMock } from './mocks-subfolder/callbacks.mock';

export class DebugMock  {

    method(a: string) {
        const b: number[] = [1, 2];
        const c = _.tail(b);
        console.log('C = ', c.toString())
        return a.slice(0);
    }

    hyperComplex<T>(object: Object, path: string | string[] = '', value: any): CallbacksMock<T> {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1)
            .reduce((acc: Object, curr: any, index: number) => {
            const arg = Math.round(index) % 3;
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new CallbacksMock<T>(object);
    }

}
