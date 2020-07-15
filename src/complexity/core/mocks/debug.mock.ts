import * as _ from 'lodash';

export class DebugMock  {

    method(a: string) {
        const b: number[] = [1, 2];
        const c = _.tail(b);
        console.log('C = ', c)
        return a.slice(0);
    }

}
