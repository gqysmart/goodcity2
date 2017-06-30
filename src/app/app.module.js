"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
/*
 * Platform and Environment providers/directives/pipes
 */
var app_routing_1 = require("./app.routing");
// App is our top level component
var app_component_1 = require("./app.component");
var app_service_1 = require("./app.service");
var global_state_1 = require("./global.state");
var nga_module_1 = require("./theme/nga.module");
var pages_module_1 = require("./pages/pages.module");
// Application wide providers
var APP_PROVIDERS = [
    app_service_1.AppState,
    global_state_1.GlobalState
];
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appState) {
        this.appState = appState;
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.App],
        declarations: [
            app_component_1.App
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            router_1.RouterModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            nga_module_1.NgaModule.forRoot(),
            ng_bootstrap_1.NgbModule.forRoot(),
            pages_module_1.PagesModule,
            app_routing_1.routing
        ],
        providers: [
            APP_PROVIDERS
        ]
    })
], AppModule);
exports.AppModule = AppModule;
