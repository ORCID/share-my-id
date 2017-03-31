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
        /*
        this.apiBaseUrl = "http://localhost:8080";
        this.CLIENT_ID = "APP-3BI8IQ5O8DREEAVF";
        this.CLIENT_SECRET = "35d8f715-9121-440c-ad34-b66cb8c4e884";
        this.ORCID_URL = 'https://sandbox.orcid.org';
        */
    }
    
    private authInfo = { //Will store the values of the generated collection. Update names for something clearer
        publicKey: null,
        privateKey: null
    };
    /*
    private apiBaseUrl:string;
    private CLIENT_ID: string;
    private CLIENT_SECRET: string;
    private ORCID_URL: string;
    */

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
    
    authenticate(): void {
        
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
