import { blueBright, red } from 'ansi-colors';
import { exec } from 'child_process';

export function createApiAngular() {
    exec('node node_modules/genese-api-angular/index.js', (error, stdout, stderr) => {
        if (error) {
            console.log(red(`Error in Genese cli execution : ${error.message}`));
            return;
        }
        if (stderr) {
            console.log(red(`Error in Genese cli command : ${stderr}`));
            return;
        }
        console.log(blueBright("Genese cli finished without errors"));
    });
}
