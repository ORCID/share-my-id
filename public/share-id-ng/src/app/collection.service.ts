import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Collection } from './collection';

@Injectable()
export class CollectionService {
    
    constructor( private http: Http ) { }
    
    private apiUrl ="";

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

    getCollection(): Observable<Collection[]> {
        return this.http.get( this.Collection ).map(( res:Response ) => res.json()).catch(this.handleError);
    }

}
