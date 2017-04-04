import { Location }               from '@angular/common';
import { Injectable }             from '@angular/core';
import { Http, Response }         from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import 'rxjs/Rx'; //Fix for error with map, catch and other functions not being in typings for observables.

@Injectable()
export class AuthInfoService {

    constructor(
        private location: Location,
        private route: ActivatedRoute,
    ) { 
    }
    
    private authInfo = { //Will store the values of the generated collection. Update names for something clearer
        publicKey: null,
        privateKey: null
    };

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    getAuthInfo(): Observable<any> {
        return Observable.of(this.authInfo);
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

    loadAuthInfo( publickeyval: string, privateKeyval: string ): void {
        this.authInfo = {
            publicKey: publickeyval,
            privateKey: privateKeyval
        }
    }

}
