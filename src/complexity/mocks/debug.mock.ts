export class DebugMock {

    /* comments
    */
    ifAlone(a) {
        if (a) {
            return 'b';
        }
    }

    keycloakService;
    logout() {
        this.logout();
    }

}

function ctxt () {
    console.log(this);
}
