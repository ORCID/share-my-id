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
      let body = res.json();
      return body.data || { };
    }

    editCollection( data: any, publicKey, privateKey ): Observable<Collection[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put( 
            '/' + publicKey + '/details/' + publicKey + '/edit/' + privateKey + '/details/form',
            data,
            options
        ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

    getCollection(publicKey): Observable<Collection[]> {
        return this.http.get( publicKey + '/details' ).map(( res:Response ) => res.json()).catch(this.handleError);

    }

    logUserOut() {
        /* 
           BROKEN_CALLBACK_IS_FINE_SEE_CODE should be JSONP_CALLBACK
           https://medium.com/@FanggengYang/how-to-use-angular-2-jsonp-c75460ad614c
           but ORCID's callback filter, filters out periods '.' and ng uses names like '__ng_jsonp__.__req0.finished'. 
           Way to use invalid function names angular 2!
        */  
        return this.configService.getConfiguration().flatMap(
              config => 
                this.jsonp.get(config['ORCID_URL'] + '/userStatus.json?logUserOut=true&callback=BROKEN_CALLBACK_IS_FINE_SEE_CODE'))
                    .catch( function (error: any) {
                      return Observable.throw(error);
                    });
    }
}