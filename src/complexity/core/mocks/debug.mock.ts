import * as _ from 'lodash';
import { CallbacksMock } from './mocks-subfolder/callbacks.mock';

export class DebugMock  {

    method(a: string) {
        const b: number[] = [1, 2];
        const c = _.tail(b);
        console.log('C = ', c.toString())
        const d = b.reduce(() => {
                    return;
                }, undefined)
        return a.slice(0);
    }

}
