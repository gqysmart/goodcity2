webpackJsonpac__name_([1],{

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(11);
var forms_1 = __webpack_require__(26);
var app_translation_module_1 = __webpack_require__(148);
var nga_module_1 = __webpack_require__(147);
var dashboard_component_1 = __webpack_require__(594);
var dashboard_routing_1 = __webpack_require__(602);
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            app_translation_module_1.AppTranslationModule,
            nga_module_1.NgaModule,
            dashboard_routing_1.routing
        ],
        declarations: [
            dashboard_component_1.Dashboard
        ],
        providers: []
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;


/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Dashboard = (function () {
    function Dashboard() {
    }
    return Dashboard;
}());
Dashboard = __decorate([
    core_1.Component({
        selector: 'dashboard',
        styles: [__webpack_require__(599)],
        template: __webpack_require__(601)
    }),
    __metadata("design:paramtypes", [])
], Dashboard);
exports.Dashboard = Dashboard;


/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(600);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, "@media screen and (min-width: 1620px) {\n  .row.shift-up > * {\n    margin-top: -573px; } }\n\n@media screen and (max-width: 1620px) {\n  .card.feed-panel.large-card {\n    height: 824px; } }\n\n.user-stats-card .card-title {\n  padding: 0 0 15px; }\n\n.blurCalendar {\n  height: 475px; }\n", ""]);

// exports


/***/ }),

/***/ 601:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <h1> this is dashboard</h1>\n</div>"

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(47);
var dashboard_component_1 = __webpack_require__(594);
// noinspection TypeScriptValidateTypes
exports.routes = [
    {
        path: '',
        component: dashboard_component_1.Dashboard,
        children: []
    }
];
exports.routing = router_1.RouterModule.forChild(exports.routes);


/***/ })

});
//# sourceMappingURL=1.chunk.js.map