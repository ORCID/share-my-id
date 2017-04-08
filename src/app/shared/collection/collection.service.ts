import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; //Fix for error with map, catch and other functions not being in typings for observables.

import { Collection } from './collection';
import { ConfigService } from './../../shared/config/config.service';
import { Collections, CollectionsEmpty } from './mock-collection';

@Injectable()
export class CollectionService {

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private configService: ConfigService
    ) {
        this.collectionPersistentObj = CollectionsEmpty;
    }

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

    private extractData(res: Response) {
      const body = res.json();
      return body.data || { };
    }

    editCollection( data: any, publicKey, privateKey ): Observable<Collection[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.put(
            '/' + publicKey + '/details/' + publicKey + '/edit/' + privateKey + '/details/form',
            data,
            options
        ).map(( res: Response ) => res.json()).catch(this.handleError);
    }

    getCollection(publicKey): Observable<Collection[]> {
        return this.http.get( publicKey + '/details' ).map(( res: Response ) => res.json()).catch(this.handleError);

    }

}