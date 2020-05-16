import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';

let DICTIONARY;

export class AstMock {
    formIsValid;
    createOrEdit;
    dialogRef;
    incidentService;
    incident;
    error;
    userService;
    keycloakAngular;
    utils;
    dictionary;
    user;
    genese;
    userAccountStateUpdated;
    originalUser;
    passwordsMatch;
    password;



    ifElse(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
        } else {
            data = 'c';
        }
        return {cyclomaticValue: 2, cognitiveValue: 2};
    }

    //
    // hasModifications(): boolean {
    //     return this.user.firstname !== this.originalUser.firstname ||
    //         this.user.lastname !== this.originalUser.lastname ||
    //         JSON.stringify(this.user.profiles_id.sort()) !== JSON.stringify(this.originalUser.profiles_id.sort()) ||
    //         (this.password !== '' && this.passwordsMatch);
    // }
    //
    // openDeleteConfirmationModal(): void {
    //     this.utils.openWarningDialog(this.dictionary.ADMIN.DIALOG.WARNING,
    //         this.dictionary.ADMIN.DIALOG.CONFIRMATION(
    //             this.dictionary.ADMIN.CONFIGURATION.LABELS.DELETE,
    //             `${this.utils.capitalize(this.user.firstname)} ${this.utils.capitalize(this.user.lastname)}`
    //         ),
    //         this.utils.capitalize(this.dictionary.ADMIN.CONFIGURATION.LABELS.DELETE),
    //         this.dictionary.ADMIN.CONFIGURATION.LABELS.DELETE_SUB_DESCRIPTION
    //         )
    //         .afterClosed()
    //         .subscribe(isActionConfirmed => {
    //                 if (isActionConfirmed) {
    //                     this.genese.deleteIamUserByUserId(this.user.user_id).subscribe(() => {
    //                         this.userAccountStateUpdated.emit(undefined);
    //                     });
    //                 }
    //             }
    //         );
    // }
    //
    // isAccessAllowed(route, state): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         const requiredRights: string[] = route.data.rights;
    //         if (!requiredRights || requiredRights.length === 0) {
    //             return resolve(true);
    //         } else {
    //             if (!this.userService.getRights() || this.userService.getRights().length === 0) {
    //                 this.keycloakAngular.logout();
    //                 resolve(false);
    //             }
    //             const result = requiredRights.find(right => this.userService.getRights().indexOf(right) > -1);
    //             if (result) {
    //                 resolve(true);
    //             } else {
    //                 this.keycloakAngular.logout();
    //                 resolve(false);
    //             }
    //
    //         }
    //     });
    // }
    //
    // submit(): void {
    //     if (this.formIsValid) {
    //         this.createOrEdit().subscribe(
    //             () => {
    //                 this.dialogRef.close();
    //                 this.incidentService.incident.next(this.incident.incident_id);
    //             },
    //             (err: any) => {
    //                 this.error = err?.error?.description || DICTIONARY.DEFAULT_ERROR;
    //             }
    //         );
    //     }
    // }
}
