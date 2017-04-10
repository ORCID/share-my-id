import { Injectable } from '@angular/core';

import {Http, Response} from '@angular/http';
import {Observable, ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class ConfigService {

  private dataObs$ = new ReplaySubject(1);

  private result: Object;

  constructor(private http: Http) { }

  /* calls /config and replays the result for any future request. */
  getConfiguration() {
    if (!this.dataObs$.observers.length) {
        this.http.get('/config').map(res => {
           return res.json();
        }).subscribe(
             data =>
                this.dataObs$.next(data),
             error => {
               this.dataObs$.error(error);
               // resets the for next time it's tried
               this.dataObs$ = new ReplaySubject(1);
            }
        );
    }
    return this.dataObs$;
  }
}
