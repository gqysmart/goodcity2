"use strict";
exports.__esModule = true;
/**
 * Angular bootstrapping
 */
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var environment_1 = require("./app/environment");
/**
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = require("./app");
/**
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule)
        .then(environment_1.decorateModuleRef)["catch"](function (err) { return console.error(err); });
}
exports.main = main;
/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
    case 'loading':
        document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
        break;
    case 'interactive':
    case 'complete':
    default:
        main();
}
function _domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
    main();
}
