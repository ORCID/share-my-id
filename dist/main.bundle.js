webpackJsonp([1,4],{

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__collection__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mock_collection__ = __webpack_require__(507);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CollectionService = (function () {
    function CollectionService(http) {
        this.http = http;
        this.apiBaseUrl = "http://localhost:8080";
        this.collectionPersistentObj = __WEBPACK_IMPORTED_MODULE_5__mock_collection__["a" /* CollectionsEmpty */];
    }
    CollectionService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    //Frame for services. Params and uri needs to be updated
    /*

    addCollection( publicKey: string, privateKey: string ): any {
        //return this.http.get( this.apiBaseUrl + '/publicKey/edit/privateKey' ).map(( res:Response ) => res.json()).catch(this.handleError);
        this.collectionPersistentObj.push( Collections[0] );
    }

    deleteCollection( publicKey: string, privateKey: string ): Observable<Collection[]> {
        return this.http.get( this.apiBaseUrl + '/publicKey/edit/privateKey' ).map(( res:Response ) => res.json()).catch(this.handleError);
    }
    */
    //Currently add and edit
    CollectionService.prototype.editCollection = function (publicKey, privateKey) {
        return this.http.get(this.apiBaseUrl + '/' + publicKey + '/details/' + publicKey + '/edit/' + privateKey + '/details/form').map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CollectionService.prototype.getCollection = function () {
        //return this.http.get( this.apiBaseUrl + '/publicKey/details' ).map(( res:Response ) => res.json()).catch(this.handleError);
        //return Collections[id];
        //this.collectionPersistentObj = Collections;
        //console.log(Collections, CollectionsEmpty);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(new __WEBPACK_IMPORTED_MODULE_4__collection__["a" /* Collection */]()).map(function (o) { return __WEBPACK_IMPORTED_MODULE_5__mock_collection__["a" /* CollectionsEmpty */]; });
    };
    CollectionService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], CollectionService);
    return CollectionService;
    var _a;
}());
//# sourceMappingURL=collection.service.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__ = __webpack_require__(337);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateCollectionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateCollectionComponent = (function () {
    function CreateCollectionComponent(authInfoService, route, router) {
        this.authInfoService = authInfoService;
        this.route = route;
        this.router = router;
        this.publicKey = route.url['_value'][0]['path'];
        this.privateKey = route.url['_value'][2]['path'];
    }
    CreateCollectionComponent.prototype.loadAuthInfo = function () {
        this.authInfoService.loadAuthInfo(this.publicKey, this.privateKey);
    };
    CreateCollectionComponent.prototype.ngOnInit = function () {
        this.loadAuthInfo();
    };
    CreateCollectionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-create-collection',
            template: __webpack_require__(576),
            styles: [__webpack_require__(566)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__["a" /* AuthInfoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__["a" /* AuthInfoService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _c) || Object])
    ], CreateCollectionComponent);
    return CreateCollectionComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=create-collection.component.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageAddMyIdComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageAddMyIdComponent = (function () {
    function PageAddMyIdComponent() {
    }
    PageAddMyIdComponent.prototype.ngOnInit = function () {
    };
    PageAddMyIdComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-page-add-my-id',
            template: __webpack_require__(579),
            styles: [__webpack_require__(569)]
        }), 
        __metadata('design:paramtypes', [])
    ], PageAddMyIdComponent);
    return PageAddMyIdComponent;
}());
//# sourceMappingURL=page-add-my-id.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_auth_info_auth_info_service__ = __webpack_require__(337);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PageHomeComponent = (function () {
    function PageHomeComponent(authInfoService) {
        this.authInfoService = authInfoService;
        this.authenticated = false; //Remove/refactor
    }
    //Remove/refactor
    PageHomeComponent.prototype.hasParams = function () {
        var _this = this;
        this.authInfoService.hasParams().subscribe(//update param to pass an actual argument 
        function (//update param to pass an actual argument 
            authenticated) {
            _this.authenticated = authenticated;
        });
    };
    PageHomeComponent.prototype.loadAuthInfo = function () {
        //this.authInfoService.loadAuthInfo();
        window.location.href = '/create-smid-authorize';
    };
    //Remove/refactor
    PageHomeComponent.prototype.login = function () {
        this.loadAuthInfo();
        this.hasParams();
        //this.authenticated = this.authInfoService.hasParamas();
        //console.log("this.authenticated ", this.authenticated );
    };
    PageHomeComponent.prototype.ngOnInit = function () {
        this.hasParams();
    };
    PageHomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-page-home',
            template: __webpack_require__(581),
            styles: [__webpack_require__(571)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_auth_info_auth_info_service__["a" /* AuthInfoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_auth_info_auth_info_service__["a" /* AuthInfoService */]) === 'function' && _a) || Object])
    ], PageHomeComponent);
    return PageHomeComponent;
    var _a;
}());
//# sourceMappingURL=page-home.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthInfoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthInfoService = (function () {
    function AuthInfoService(location, route) {
        this.location = location;
        this.route = route;
        this.authInfo = {
            publicKey: null,
            privateKey: null
        };
        /*
        this.apiBaseUrl = "http://localhost:8080";
        this.CLIENT_ID = "APP-3BI8IQ5O8DREEAVF";
        this.CLIENT_SECRET = "35d8f715-9121-440c-ad34-b66cb8c4e884";
        this.ORCID_URL = 'https://sandbox.orcid.org';
        */
    }
    /*
    private apiBaseUrl:string;
    private CLIENT_ID: string;
    private CLIENT_SECRET: string;
    private ORCID_URL: string;
    */
    AuthInfoService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw(errMsg);
    };
    AuthInfoService.prototype.authenticate = function () {
    };
    AuthInfoService.prototype.hasParams = function () {
        var hasParams = false;
        if (this.authInfo.publicKey != null && this.authInfo.privateKey != null) {
            hasParams = true;
        }
        else {
            hasParams = false;
        }
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(hasParams);
    };
    AuthInfoService.prototype.loadAuthInfo = function (publickeyval, privateKeyval) {
        this.authInfo = {
            publicKey: publickeyval,
            privateKey: privateKeyval
        };
        console.log("loadAuthInfo", this.authInfo);
    };
    AuthInfoService = __decorate([
        //Fix for error with map, catch and other functions not being in typings for observables.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* Location */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], AuthInfoService);
    return AuthInfoService;
    var _a, _b;
}());
//# sourceMappingURL=auth-info.service.js.map

/***/ }),

/***/ 379:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 379;


/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(508);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_collection_create_collection_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_add_my_id_page_add_my_id_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_home_page_home_component__ = __webpack_require__(336);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var routes = [
    {
        component: __WEBPACK_IMPORTED_MODULE_4__page_home_page_home_component__["a" /* PageHomeComponent */],
        path: '' // update to 'create-smid-authorize'
    },
    {
        component: __WEBPACK_IMPORTED_MODULE_3__page_add_my_id_page_add_my_id_component__["a" /* PageAddMyIdComponent */],
        path: ':publicKey'
    },
    {
        component: __WEBPACK_IMPORTED_MODULE_2__create_collection_create_collection_component__["a" /* CreateCollectionComponent */],
        path: ':publicKey/edit/:privateKey'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes, { useHash: true }) //http://stackoverflow.com/questions/31415052/angular-2-0-router-not-working-on-reloading-the-browser posible fix to remove the hash #
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(573),
            styles: [__webpack_require__(563)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_collection_collection_service__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_auth_info_auth_info_service__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__collection_form_collection_form_component__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__collection_links_collection_links_component__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__create_collection_create_collection_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__footer_footer_component__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__header_header_component__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_add_my_id_page_add_my_id_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_confirm_collection_page_confirm_collection_component__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_home_page_home_component__ = __webpack_require__(336);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__collection_form_collection_form_component__["a" /* CollectionFormComponent */],
                __WEBPACK_IMPORTED_MODULE_9__collection_links_collection_links_component__["a" /* CollectionLinksComponent */],
                __WEBPACK_IMPORTED_MODULE_10__create_collection_create_collection_component__["a" /* CreateCollectionComponent */],
                __WEBPACK_IMPORTED_MODULE_11__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_12__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_14__page_confirm_collection_page_confirm_collection_component__["a" /* PageConfirmCollectionComponent */],
                __WEBPACK_IMPORTED_MODULE_15__page_home_page_home_component__["a" /* PageHomeComponent */],
                __WEBPACK_IMPORTED_MODULE_13__page_add_my_id_page_add_my_id_component__["a" /* PageAddMyIdComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__shared_auth_info_auth_info_service__["a" /* AuthInfoService */],
                __WEBPACK_IMPORTED_MODULE_6__shared_collection_collection_service__["a" /* CollectionService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CollectionFormComponent = (function () {
    function CollectionFormComponent(collectionService) {
        this.collectionService = collectionService;
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
    }
    CollectionFormComponent.prototype.ngOnInit = function () {
    };
    CollectionFormComponent.prototype.resetForm = function () {
        this.description = "";
        this.title = "";
        //this.ngForm.reset(); <- This is reloading the whole app, needs a fix
    };
    CollectionFormComponent.prototype.submitForm = function (form) {
        this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 
        this.collectionService.editCollection("", "");
        this.resetForm(); // <- Update to change the status on the ajax call result 
    };
    CollectionFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-collection-form',
            template: __webpack_require__(574),
            styles: [__webpack_require__(564)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__["a" /* CollectionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__["a" /* CollectionService */]) === 'function' && _a) || Object])
    ], CollectionFormComponent);
    return CollectionFormComponent;
    var _a;
}());
//# sourceMappingURL=collection-form.component.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionLinksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CollectionLinksComponent = (function () {
    function CollectionLinksComponent(collectionService) {
        this.collectionService = collectionService;
    }
    CollectionLinksComponent.prototype.getCollections = function () {
        var _this = this;
        this.collectionService.getCollection().subscribe(//update param to pass an actual argument 
        function (//update param to pass an actual argument 
            collections) {
            _this.collections = collections;
        });
    };
    CollectionLinksComponent.prototype.ngOnInit = function () {
        this.getCollections();
    };
    CollectionLinksComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-collection-links',
            template: __webpack_require__(575),
            styles: [__webpack_require__(565)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__["a" /* CollectionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__["a" /* CollectionService */]) === 'function' && _a) || Object])
    ], CollectionLinksComponent);
    return CollectionLinksComponent;
    var _a;
}());
//# sourceMappingURL=collection-links.component.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__(577),
            styles: [__webpack_require__(567)]
        }), 
        __metadata('design:paramtypes', [])
    ], FooterComponent);
    return FooterComponent;
}());
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__(578),
            styles: [__webpack_require__(568)]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageConfirmCollectionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageConfirmCollectionComponent = (function () {
    function PageConfirmCollectionComponent() {
    }
    PageConfirmCollectionComponent.prototype.ngOnInit = function () {
    };
    PageConfirmCollectionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-page-confirm-collection',
            template: __webpack_require__(580),
            styles: [__webpack_require__(570)]
        }), 
        __metadata('design:paramtypes', [])
    ], PageConfirmCollectionComponent);
    return PageConfirmCollectionComponent;
}());
//# sourceMappingURL=page-confirm-collection.component.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collection; });
var Collection = (function () {
    function Collection() {
    }
    return Collection;
}());
//# sourceMappingURL=collection.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Collections */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionsEmpty; });
var Collections = [
    {
        createdByAuthor: 'Author1',
        createdByUrl: 'http://www.url.com/1',
        createdDate: '10 Mar, 2017',
        description: 'Description1',
        id: '1',
        orcidIDs: [
            {
                firstName: 'first name 1',
                lastName: 'last name 1',
                orcidId: 'orcid id 1'
            },
            {
                firstName: 'first name 2',
                lastName: 'last name 2',
                orcidId: 'orcid id 2'
            },
            {
                firstName: 'first name 3',
                lastName: 'last name 3',
                orcidId: 'orcid id 3'
            }
        ],
        title: 'Title1'
    }
];
var CollectionsEmpty = [];
//# sourceMappingURL=mock-collection.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "main {\n  padding-bottom: 100px;\n  padding-top: 25px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "/****************************************************\r\n//Base colors\r\n****************************************************/\n/****************************************************\r\n//Font sizes\r\n****************************************************/\n/****************************************************\r\n//Themes colors\r\n****************************************************/\nlegend {\n  color: #31789B;\n  font-size: 24px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "/****************************************************\r\n//Base colors\r\n****************************************************/\n/****************************************************\r\n//Font sizes\r\n****************************************************/\n/****************************************************\r\n//Themes colors\r\n****************************************************/\nfooter {\n  background-color: #939598; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "/****************************************************\r\n//Base colors\r\n****************************************************/\n/****************************************************\r\n//Font sizes\r\n****************************************************/\n/****************************************************\r\n//Themes colors\r\n****************************************************/\nheader {\n  background-color: #FFF;\n  border-bottom: 1px solid #939598; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 573:
/***/ (function(module, exports) {

module.exports = "\r\n<!-- Header here -->\r\n<app-header></app-header>\r\n\r\n<main class=\"container\" id=\"content\" tabindex=\"-1\">\r\n    <!-- Content here -->\r\n    <router-outlet></router-outlet>\r\n</main>\r\n\r\n<!-- Footer here -->\r\n<app-footer></app-footer>"

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col\">\r\n        <div (click)=\"showErrorMessage = !showErrorMessage\" *ngIf=\"showErrorMessage\" class=\"alert alert-danger\" role=\"alert\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n            <strong>Oh snap!</strong> Change a few things up and try submitting again.\r\n        </div>\r\n        <div (click)=\"showSuccessMessage = !showSuccessMessage\" *ngIf=\"showSuccessMessage\" class=\"alert alert-success\" role=\"alert\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n            <strong>Well done!</strong> You successfully added a collection.\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col\">\r\n        <form #formRef=\"ngForm\" (ngSubmit)=\"submitForm(formRef.value)\" novalidate>\r\n            <fieldset>\r\n                <legend class=\"font-weight-bold text-center\">ID Collection Details</legend>\r\n\r\n                <div \r\n                    class=\"form-group\" \r\n                    [class.has-success]=\"titleRef.valid\"\r\n                    [class.has-danger]=\"titleRef.valid==false && titleRef.dirty\"\r\n                >\r\n                    <label class=\"form-control-label font-weight-bold\" for=\"title\">Title</label>\r\n                    <input \r\n                        [(ngModel)]=\"title\"\r\n                        [class.form-control-success]=\"titleRef.valid\"\r\n                        [class.form-control-danger]=\"titleRef.valid==false && titleRef.dirty\"\r\n                        #titleRef=\"ngModel\" \r\n                        autocomplete=\"off\"\r\n                        class=\"form-control\" \r\n                        id=\"title\" \r\n                        minlength=\"4\" \r\n                        name=\"title\" \r\n                        placeholder=\"Write the collection title here...\" \r\n                        type=\"text\" \r\n                        required\r\n                    >\r\n                    <div \r\n                        *ngIf=\"titleRef.errors && titleRef.dirty\"\r\n                        class=\"form-control-feedback\" \r\n                    >\r\n                        <small  *ngIf=\"titleRef.errors?.required\">This field is required</small >\r\n                        <small  *ngIf=\"titleRef.errors?.minlength\">This field must be longer than {{titleRef.errors?.minlength.requiredLength}} characters. You only typed {{titleRef.errors?.minlength.actualLength}}</small >\r\n                    </div>\r\n                </div>\r\n\r\n                <div \r\n                    class=\"form-group\" \r\n                    [class.has-success]=\"descriptionRef.valid\"\r\n                    [class.has-danger]=\"descriptionRef.valid==false && descriptionRef.dirty\"\r\n                >\r\n                    <label class=\"form-control-label font-weight-bold\" for=\"description\">Description</label>\r\n                    <textarea\r\n                        [(ngModel)]=\"description\"\r\n                        [class.form-control-success]=\"descriptionRef.valid\"\r\n                        [class.form-control-danger]=\"descriptionRef.valid==false && descriptionRef.dirty\"\r\n                        #descriptionRef=\"ngModel\" \r\n                        class=\"form-control\" \r\n                        id=\"description\" \r\n                        minlength=\"4\" \r\n                        name=\"description\" \r\n                        placeholder=\"Write the collection description here...\" \r\n                        required\r\n                        rows=\"5\"\r\n                    ></textarea> \r\n                    <div \r\n                        *ngIf=\"descriptionRef.errors && descriptionRef.dirty\"\r\n                        class=\"form-control-feedback\" \r\n                    >\r\n                        <small  *ngIf=\"descriptionRef.errors?.required\">This field is required</small >\r\n                        <small  *ngIf=\"descriptionRef.errors?.minlength\">This field must be longer than {{descriptionRef.errors?.minlength.requiredLength}} characters. You only typed {{descriptionRef.errors?.minlength.actualLength}}</small >\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <p class=\"form-control-label font-weight-bold\">\r\n                        Created by\r\n                    </p>\r\n                    <p>Username. http://placeholder-url.com</p>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <button \r\n                        [disabled]=\"!formRef.valid\"\r\n                        class=\"btn btn-primary\" \r\n                        type=\"submit\" \r\n                        role=\"button\"\r\n                    >\r\n                        Save Details\r\n                    </button>\r\n                    <button \r\n                        (click)=\"showErrorMessage = true\"\r\n                        class=\"btn btn-primary\" \r\n                        type=\"submit\" \r\n                        role=\"button\"\r\n                    >\r\n                        Save Details - Error Example\r\n                    </button>\r\n                </div>\r\n            </fieldset>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 575:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"collections!=undefined && collections.length > 0\" class=\"row\">\r\n    <div class=\"col\">\r\n        <p>\r\n            <button (click)=\"console.log('works')\" class=\"btn btn-primary\">Add my iD</button>\r\n        </p>\r\n    </div>\r\n</div>\r\n<section class=\"row\">\r\n    <div class=\"col\">\r\n        <div\r\n            *ngIf=\"collections!=undefined && collections.length > 0\" \r\n            class=\"card\"\r\n        >\r\n            <div \r\n                *ngFor=\"let collection of collections\"\r\n                class=\"card-block text-nowrap\"\r\n            >\r\n                <h2>{{collection.title}}</h2>\r\n                <p><i>Created by {{collection.createdByAuthor}} on {{collection.createdDate}}</i></p>\r\n                <p>{{collection.description}}</p>\r\n\r\n                <table \r\n                    *ngIf=\"collection.orcidIDs.length > 0\" \r\n                    class=\"table\"\r\n                >\r\n                    <thead class=\"thead-default\">\r\n                        <tr>\r\n                            <th>#</th>\r\n                            <th>First Name</th>\r\n                            <th>Last Name</th>\r\n                            <th>ORCID iD</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr\r\n                            *ngFor=\"let orcidId of collection.orcidIDs; let j = index\"\r\n                            [attr.data-index]=\"j\"\r\n                        >\r\n                            <th scope=\"row\">{{j+1}}</th>\r\n                            <td>{{orcidId.firstName}}</td>\r\n                            <td>{{orcidId.lastName}}</td>\r\n                            <td><a href=\"{{orcidId.orcidId}}\" target=\"_blank\">{{orcidId.orcidId}}</a></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<div *ngIf=\"collections!=undefined && collections.length > 0\" class=\"row\">\r\n    <div class=\"col\">\r\n        <p>\r\n            <button (click)=\"console.log('works')\" class=\"btn btn-primary\">Add my iD</button>\r\n        </p>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 576:
/***/ (function(module, exports) {

module.exports = "<app-collection-form></app-collection-form>\r\n<app-collection-links></app-collection-links>"

/***/ }),

/***/ 577:
/***/ (function(module, exports) {

module.exports = "<footer class=\"fixed-bottom\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col\">\r\n                <p>\r\n                    footer works!\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</footer>\r\n\r\n"

/***/ }),

/***/ 578:
/***/ (function(module, exports) {

module.exports = "<header class=\"sticky-top\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <nav class=\"col\">\r\n                <p>\r\n                    <a routerLink=\"/\" routerLinkActive=\"active\">Home</a>\r\n                </p>\r\n            </nav>\r\n        </div>\r\n    </div>\r\n</header>\r\n\r\n"

/***/ }),

/***/ 579:
/***/ (function(module, exports) {

module.exports = "<section>\n    <div class=\"row\">\n        <div class=\"col text-center\">\n            <h1>Share My ORCID iD</h1>\n            <p>A simple way to collect authenticated ORCID iDs</p>\n            <p><i>Pretty cool, right? <a routerLink=\"/\">Create your own iD collection now</a></i></p>\n        </div>\n    </div>\n    <app-collection-links *ngIf=\"authenticated\"></app-collection-links>\n    \n</section>\n"

/***/ }),

/***/ 580:
/***/ (function(module, exports) {

module.exports = "<p>\r\n  page-confirm-collection works!\r\n</p>\r\n"

/***/ }),

/***/ 581:
/***/ (function(module, exports) {

module.exports = "<section class=\"row\">\r\n    <div class=\"col text-center\">\r\n        <h1>Share My ORCID iD</h1>\r\n        <p>A simple way to collect authenticated ORCID iDs</p>\r\n        <p\r\n            *ngIf=\"!authenticated\" \r\n        >\r\n            <button (click)=\"loadAuthInfo()\" class=\"btn btn-primary\">Create a new iD collection</button>\r\n        </p>\r\n        <!--\r\n        <p\r\n            *ngIf=\"authenticated\" \r\n        >\r\n            <a routerLink=\"/create-collection\" class=\"btn btn-primary\">Create a new iD collection</a>\r\n        </p>\r\n        -->\r\n    </div>\r\n</section>\r\n"

/***/ }),

/***/ 848:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(380);


/***/ })

},[848]);
//# sourceMappingURL=main.bundle.js.map