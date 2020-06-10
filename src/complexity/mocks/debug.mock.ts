export class DebugMock {
    keycloakService;
    logout() {
        this.keycloakService.logout();
    }

}

function ctxt () {
    console.log(this);
}
