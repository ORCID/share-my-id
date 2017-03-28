import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; //Fix for error with map, catch and other functions not being in typings for observables.

import { Collection } from './collection';

@Injectable()
export class CollectionService {
    
    constructor( private http: Http ) { }
    
    private apiBaseUrl ="http://localhost:8080";

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

    editCollection( publicKey: string, privateKey: string ): Observable<Collection[]> {
        return this.http.get( this.apiBaseUrl + '/publicKey/edit/privateKey' ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

    getCollection( publicKey: string ): Observable<Collection[]> {
        return this.http.get( this.apiBaseUrl + '/publicKey/details' ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

}
