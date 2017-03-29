import { Location }               from '@angular/common';
import { Injectable }             from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import 'rxjs/Rx'; //Fix for error with map, catch and other functions not being in typings for observables.

@Injectable()
export class AuthInfoService {

    constructor(
        private location: Location,
        private route: ActivatedRoute,
    ) { }

    private authInfo = {
        publicKey: null,
        privateKey: null
    }

    hasParams(): Observable<boolean> {
        var hasParams = false;
        if( this.authInfo.publicKey != null && this.authInfo.privateKey != null ){
            hasParams = true;
        }else {
            hasParams = false;
        }
        return Observable.of(hasParams);
    }

    loadAuthInfo(): void {
        this.authInfo = {
            publicKey: "publickeyval",
            privateKey: "privateKeyval"
        }
    }

}
