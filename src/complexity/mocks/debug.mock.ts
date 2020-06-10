export class DebugMock {
    keycloakService;
    logout() {
        this.keycloakService.logout();
    }
}
