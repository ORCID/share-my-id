import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; //Fix for error with map, catch and other functions not being in typings for observables.

import { Collection } from './collection';
import { Collections, CollectionsEmpty } from './mock-collection';

import { AuthInfoService } from './../auth-info/auth-info.service';

@Injectable()
export class CollectionService {
    
    constructor( 
        private http: Http, 
        private authInfoService: AuthInfoService
    ) {
        this.apiBaseUrl = "https://localhost:8080";
        //this.authInfo = authInfoService.getAuthInfo();
        this.collectionPersistentObj = CollectionsEmpty;
    }
    
    private apiBaseUrl:string;
    authInfo: any; //json object
    private collectionPersistentObj: Collection[];

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
    editCollection( data: any ): Observable<Collection[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.authInfoService.getAuthInfo().subscribe( //update param to pass an actual argument 
            authInfo => { 
                this.authInfo = authInfo;
            }
        );

        console.log("data", data);

        return this.http.put( 
            this.apiBaseUrl + '/' + this.authInfo.publicKey + '/details/' + this.authInfo.publicKey + '/edit/' + this.authInfo.privateKey + '/details/form',
            data,
            options
        ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

    getCollection(publicKey): Observable<Collection[]> {
        return this.http.get( publicKey + '/details' ).map(( res:Response ) => res.json()).catch(this.handleError);

    }
}