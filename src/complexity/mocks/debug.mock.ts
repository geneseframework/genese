export class DebugMock {
    keycloakService;
    logout() {
        this.keycloakService.logout();
    }

    recursion(a) {
        this.recursion(a);
    }


    methodWithCallback(a, callback) {
        callback(3);
    }

}
