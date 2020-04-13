"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var child_process_1 = require("child_process");
function createApiAngular() {
    child_process_1.exec('node node_modules/genese-api-angular/index.js', function (error, stdout, stderr) {
        if (error) {
            console.log(ansi_colors_1.red("Error in Genese cli execution : " + error.message));
            return;
        }
        if (stderr) {
            console.log(ansi_colors_1.red("Error in Genese cli command : " + stderr));
            return;
        }
        console.log(ansi_colors_1.blueBright("Genese cli finished without errors"));
    });
}
exports.createApiAngular = createApiAngular;
