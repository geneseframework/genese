import { CallbacksMock } from './mock-subfolder-two/callbacks.mock';


export class DebugMock {


    ifAlone(a) {
        if (a) {
            return 'b';
        } else {
            return 'c';
        }
    }
}
