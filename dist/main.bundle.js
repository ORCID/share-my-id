webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(351);
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
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */]) {
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
    AuthInfoService.prototype.getAuthInfo = function () {
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(this.authInfo);
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

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mock_collection__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_info_auth_info_service__ = __webpack_require__(100);
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
    function CollectionService(http, authInfoService) {
        this.http = http;
        this.authInfoService = authInfoService;
        this.apiBaseUrl = "https://localhost:8080";
        //this.authInfo = authInfoService.getAuthInfo();
        this.collectionPersistentObj = __WEBPACK_IMPORTED_MODULE_4__mock_collection__["a" /* CollectionsEmpty */];
    }
    CollectionService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
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
    CollectionService.prototype.editCollection = function (data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        this.authInfoService.getAuthInfo().subscribe(//update param to pass an actual argument 
        function (//update param to pass an actual argument 
            authInfo) {
            _this.authInfo = authInfo;
        });
        console.log("data", data);
        return this.http.put(this.apiBaseUrl + '/' + this.authInfo.publicKey + '/details/' + this.authInfo.publicKey + '/edit/' + this.authInfo.privateKey + '/details/form', data, options).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CollectionService.prototype.getCollection = function () {
        //return this.http.get( this.apiBaseUrl + '/publicKey/details' ).map(( res:Response ) => res.json()).catch(this.handleError);
        //return Collections[id];
        //this.collectionPersistentObj = Collections;
        //console.log(Collections, CollectionsEmpty);
        //return Observable.of( new Collection() ).map( o => CollectionsEmpty );
        return this.http.get(this.apiBaseUrl + '/' + this.authInfo.publicKey).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CollectionService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__auth_info_auth_info_service__["a" /* AuthInfoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_info_auth_info_service__["a" /* AuthInfoService */]) === 'function' && _b) || Object])
    ], CollectionService);
    return CollectionService;
    var _a, _b;
}());
//# sourceMappingURL=collection.service.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__ = __webpack_require__(100);
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

/***/ 337:
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

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_auth_info_auth_info_service__ = __webpack_require__(100);
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
    PageHomeComponent.prototype.authenticate = function () {
        //this.authInfoService.loadAuthInfo();
        window.location.href = '/create-smid-authorize';
    };
    //Remove/refactor
    PageHomeComponent.prototype.login = function () {
        this.authenticate();
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

/***/ 380:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 380;


/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(508);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_collection_create_collection_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_add_my_id_page_add_my_id_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_home_page_home_component__ = __webpack_require__(338);
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
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes, { useHash: false }) //http://stackoverflow.com/questions/31415052/angular-2-0-router-not-working-on-reloading-the-browser posible fix to remove the hash #
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

/***/ 500:
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

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_collection_collection_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_auth_info_auth_info_service__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__collection_form_collection_form_component__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__collection_links_collection_links_component__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__create_collection_create_collection_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__footer_footer_component__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__header_header_component__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_add_my_id_page_add_my_id_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_confirm_collection_page_confirm_collection_component__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_home_page_home_component__ = __webpack_require__(338);
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
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* JsonpModule */]
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

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_collection_collection_service__ = __webpack_require__(221);
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
    function CollectionFormComponent(collectionService, authInfoService, route, router) {
        this.collectionService = collectionService;
        this.authInfoService = authInfoService;
        this.route = route;
        this.router = router;
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
        this.publicKey = route.url['_value'][0]['path'];
        this.privateKey = route.url['_value'][2]['path'];
    }
    CollectionFormComponent.prototype.ngOnInit = function () {
    };
    CollectionFormComponent.prototype.resetForm = function () {
        this.description = "";
        this.title = "";
        //this.ngForm.reset(); <- This is reloading the whole app, needs a fix
    };
    CollectionFormComponent.prototype.submitForm = function (form) {
        var _this = this;
        console.log("form", form);
        this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 
        this.collectionService.editCollection(form).subscribe(function (response) {
            _this.response = response;
            console.log(_this.response, response);
        }, function (err) { return console.log(err); }, function () { return console.log("Done"); });
        this.resetForm(); // <- Update to change the status on the ajax call result 
    };
    CollectionFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-collection-form',
            template: __webpack_require__(574),
            styles: [__webpack_require__(564)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_collection_collection_service__["a" /* CollectionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__shared_collection_collection_service__["a" /* CollectionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__["a" /* AuthInfoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__shared_auth_info_auth_info_service__["a" /* AuthInfoService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _d) || Object])
    ], CollectionFormComponent);
    return CollectionFormComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=collection-form.component.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(97);
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
    //private privateKey: string;
    function CollectionLinksComponent(collectionService, route, router) {
        this.collectionService = collectionService;
        this.route = route;
        this.router = router;
        this.publicKey = route.url['_value'][0]['path'];
        //this.privateKey = route.url['_value'][2]['path'];
    }
    CollectionLinksComponent.prototype.authenticate = function () {
        //this.authInfoService.loadAuthInfo();
        window.location.href = '/add-id-authorize/' + this.publicKey;
    };
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
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__["a" /* CollectionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_collection_collection_service__["a" /* CollectionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === 'function' && _c) || Object])
    ], CollectionLinksComponent);
    return CollectionLinksComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=collection-links.component.js.map

/***/ }),

/***/ 504:
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

/***/ 505:
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

/***/ 506:
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
exports.push([module.i, "/****************************************************\n//Base colors\n****************************************************/\n/****************************************************\n//Font sizes\n****************************************************/\n/****************************************************\n//Themes colors\n****************************************************/\nlegend {\n  color: #31789B;\n  font-size: 24px; }\n", ""]);

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
exports.push([module.i, "/****************************************************\n//Base colors\n****************************************************/\n/****************************************************\n//Font sizes\n****************************************************/\n/****************************************************\n//Themes colors\n****************************************************/\nfooter {\n  background-color: #939598; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "/****************************************************\n//Base colors\n****************************************************/\n/****************************************************\n//Font sizes\n****************************************************/\n/****************************************************\n//Themes colors\n****************************************************/\nheader {\n  background-color: #FFF;\n  border-bottom: 1px solid #939598; }\n", ""]);

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

module.exports = "\n<!-- Header here -->\n<app-header></app-header>\n\n<main class=\"container\" id=\"content\" tabindex=\"-1\">\n    <!-- Content here -->\n    <router-outlet></router-outlet>\n</main>\n\n<!-- Footer here -->\n<app-footer></app-footer>"

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col\">\n        <div (click)=\"showErrorMessage = !showErrorMessage\" *ngIf=\"showErrorMessage\" class=\"alert alert-danger\" role=\"alert\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <strong>Oh snap!</strong> Change a few things up and try submitting again.\n        </div>\n        <div (click)=\"showSuccessMessage = !showSuccessMessage\" *ngIf=\"showSuccessMessage\" class=\"alert alert-success\" role=\"alert\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <strong>Well done!</strong> You successfully added a collection.\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col\">\n        <form #formRef=\"ngForm\" (ngSubmit)=\"submitForm(formRef.value)\" novalidate>\n            <fieldset>\n                <legend class=\"font-weight-bold text-center\">ID Collection Details</legend>\n\n                <div \n                    class=\"form-group\" \n                    [class.has-success]=\"titleRef.valid\"\n                    [class.has-danger]=\"titleRef.valid==false && titleRef.dirty\"\n                >\n                    <label class=\"form-control-label font-weight-bold\" for=\"title\">Title</label>\n                    <input \n                        [(ngModel)]=\"title\"\n                        [class.form-control-success]=\"titleRef.valid\"\n                        [class.form-control-danger]=\"titleRef.valid==false && titleRef.dirty\"\n                        #titleRef=\"ngModel\" \n                        autocomplete=\"off\"\n                        class=\"form-control\" \n                        id=\"title\" \n                        minlength=\"4\" \n                        name=\"title\" \n                        placeholder=\"Write the collection title here...\" \n                        type=\"text\" \n                        required\n                    >\n                    <div \n                        *ngIf=\"titleRef.errors && titleRef.dirty\"\n                        class=\"form-control-feedback\" \n                    >\n                        <small  *ngIf=\"titleRef.errors?.required\">This field is required</small >\n                        <small  *ngIf=\"titleRef.errors?.minlength\">This field must be longer than {{titleRef.errors?.minlength.requiredLength}} characters. You only typed {{titleRef.errors?.minlength.actualLength}}</small >\n                    </div>\n                </div>\n\n                <div \n                    class=\"form-group\" \n                    [class.has-success]=\"descriptionRef.valid\"\n                    [class.has-danger]=\"descriptionRef.valid==false && descriptionRef.dirty\"\n                >\n                    <label class=\"form-control-label font-weight-bold\" for=\"description\">Description</label>\n                    <textarea\n                        [(ngModel)]=\"description\"\n                        [class.form-control-success]=\"descriptionRef.valid\"\n                        [class.form-control-danger]=\"descriptionRef.valid==false && descriptionRef.dirty\"\n                        #descriptionRef=\"ngModel\" \n                        class=\"form-control\" \n                        id=\"description\" \n                        minlength=\"4\" \n                        name=\"description\" \n                        placeholder=\"Write the collection description here...\" \n                        required\n                        rows=\"5\"\n                    ></textarea> \n                    <div \n                        *ngIf=\"descriptionRef.errors && descriptionRef.dirty\"\n                        class=\"form-control-feedback\" \n                    >\n                        <small  *ngIf=\"descriptionRef.errors?.required\">This field is required</small >\n                        <small  *ngIf=\"descriptionRef.errors?.minlength\">This field must be longer than {{descriptionRef.errors?.minlength.requiredLength}} characters. You only typed {{descriptionRef.errors?.minlength.actualLength}}</small >\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <p class=\"form-control-label font-weight-bold\">\n                        Created by\n                    </p>\n                    <p>Username. http://placeholder-url.com</p>\n                </div>\n                <div class=\"form-group\">\n                    <button \n                        [disabled]=\"!formRef.valid\"\n                        class=\"btn btn-primary\" \n                        type=\"submit\" \n                        role=\"button\"\n                    >\n                        Save Details\n                    </button>\n                    <button \n                        (click)=\"showErrorMessage = true\"\n                        class=\"btn btn-primary\" \n                        type=\"submit\" \n                        role=\"button\"\n                    >\n                        Save Details - Error Example\n                    </button>\n                </div>\n            </fieldset>\n        </form>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col\">\n        <h2>Collection Links <span class=\"small\">Hold onto these!</span></h2>\n        <p class=\"bold\">Administration Link</p>\n        <p>Use this link to edit collection details:</p>\n        <p><a href=\"\">https://share-my-id.orcid.org/{{publicKey}}/edit/{{privatekey}}</a></p>\n        <p class=\"bold\">Share Link</p>\n        <p>Share this link with anyone whose iD you want to collect, or display this page on a laptop/tablet at your event:</p>\n        <p><a href=\"\">https://share-my-id.orcid.org/{{publicKey}}</a></p>\n    </div>\n</div>"

/***/ }),

/***/ 575:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col\">\n        <p>\n            <button (click)=\"authenticate()\" class=\"btn btn-primary\">Add my iD</button>\n        </p>\n    </div>\n</div>\n<section class=\"row\">\n    <div class=\"col\">\n        <div\n            *ngIf=\"collections!=undefined && collections.length > 0\" \n            class=\"card\"\n        >\n            <div \n                *ngFor=\"let collection of collections\"\n                class=\"card-block text-nowrap\"\n            >\n                <h2>{{collection.title}}</h2>\n                <p><i>Created by {{collection.createdByAuthor}} on {{collection.createdDate}}</i></p>\n                <p>{{collection.description}}</p>\n\n                <table \n                    *ngIf=\"collection.orcidIDs.length > 0\" \n                    class=\"table\"\n                >\n                    <thead class=\"thead-default\">\n                        <tr>\n                            <th>#</th>\n                            <th>First Name</th>\n                            <th>Last Name</th>\n                            <th>ORCID iD</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr\n                            *ngFor=\"let orcidId of collection.orcidIDs; let j = index\"\n                            [attr.data-index]=\"j\"\n                        >\n                            <th scope=\"row\">{{j+1}}</th>\n                            <td>{{orcidId.firstName}}</td>\n                            <td>{{orcidId.lastName}}</td>\n                            <td><a href=\"{{orcidId.orcidId}}\" target=\"_blank\">{{orcidId.orcidId}}</a></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</section>\n<div *ngIf=\"collections!=undefined && collections.length > 0\" class=\"row\">\n    <div class=\"col\">\n        <p>\n            <button (click)=\"authenticate()\" class=\"btn btn-primary\">Add my iD</button>\n        </p>\n    </div>\n</div>"

/***/ }),

/***/ 576:
/***/ (function(module, exports) {

module.exports = "<app-collection-form></app-collection-form>"

/***/ }),

/***/ 577:
/***/ (function(module, exports) {

module.exports = "<footer class=\"fixed-bottom\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col\">\n                <p>\n                    footer works!\n                </p>\n            </div>\n        </div>\n    </div>\n</footer>\n\n"

/***/ }),

/***/ 578:
/***/ (function(module, exports) {

module.exports = "<header class=\"sticky-top\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <nav class=\"col\">\n                <p>\n                    <a routerLink=\"/\" routerLinkActive=\"active\">Home</a>\n                </p>\n            </nav>\n        </div>\n    </div>\n</header>\n\n"

/***/ }),

/***/ 579:
/***/ (function(module, exports) {

module.exports = "<section>\n    <div class=\"row\">\n        <div class=\"col text-center\">\n            <h1>Share My ORCID iD</h1>\n            <p>A simple way to collect authenticated ORCID iDs</p>\n            <p><i>Pretty cool, right? <a routerLink=\"/\">Create your own iD collection now</a></i></p>\n        </div>\n    </div>\n    <app-collection-links></app-collection-links>\n    \n</section>\n"

/***/ }),

/***/ 580:
/***/ (function(module, exports) {

module.exports = "<p>\n  page-confirm-collection works!\n</p>\n"

/***/ }),

/***/ 581:
/***/ (function(module, exports) {

module.exports = "<section class=\"row\">\n    <div class=\"col text-center\">\n        <h1>Share My ORCID iD</h1>\n        <p>A simple way to collect authenticated ORCID iDs</p>\n        <p\n            *ngIf=\"!authenticated\" \n        >\n            <button (click)=\"authenticate()\" class=\"btn btn-primary\">Create a new iD collection</button>\n        </p>\n        <!--\n        <p\n            *ngIf=\"authenticated\" \n        >\n            <a routerLink=\"/create-collection\" class=\"btn btn-primary\">Create a new iD collection</a>\n        </p>\n        -->\n    </div>\n</section>\n"

/***/ }),

/***/ 847:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(381);


/***/ })

},[847]);
//# sourceMappingURL=main.bundle.js.map