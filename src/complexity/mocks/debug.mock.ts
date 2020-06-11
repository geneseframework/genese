import { CallbacksMock } from './mocks-subfolder/callbacks.mock';
var z;
export class DebugMock {

    hyperComplex() {
        z((acc: any) => {
            acc(0);
        });
    }

    ifAlone(a) {
        return a('b');
    }
    //
    keycloakService;
    logout(a) {
        this.logout(a);
    }

}

// function ctxt (a) {
//     console.log(a('b'));
// }
