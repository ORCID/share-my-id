import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; //Fix for error with map, catch and other functions not being in typings for observables.

import { Collection } from './collection';
import { Collections } from './mock-collection';

@Injectable()
export class CollectionService {
    
    constructor( private http: Http ) { }
    
    private apiBaseUrl = "http://localhost:8080";
    private collectionPersistentObj = Collections;

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

    //Frame for services. Params and uri needs to be updated
    addCollection( publicKey: string, privateKey: string ): any {
        //return this.http.get( this.apiBaseUrl + '/publicKey/edit/privateKey' ).map(( res:Response ) => res.json()).catch(this.handleError);
        this.collectionPersistentObj.push( this.collectionPersistentObj[0] );
    }

    deleteCollection( publicKey: string, privateKey: string ): Observable<Collection[]> {
        return this.http.get( this.apiBaseUrl + '/publicKey/edit/privateKey' ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

    editCollection( publicKey: string, privateKey: string ): Observable<Collection[]> {
        return this.http.get( this.apiBaseUrl + '/publicKey/edit/privateKey' ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

    getCollection(): Observable<Collection[]> {
        //return this.http.get( this.apiBaseUrl + '/publicKey/details' ).map(( res:Response ) => res.json()).catch(this.handleError);
        //return Collections[id];
        //this.collectionPersistentObj = Collections;
        return Observable.of( new Collection() ).map( o => Collections );
    }
}