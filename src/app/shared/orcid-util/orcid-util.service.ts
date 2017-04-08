import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ConfigService } from './../../shared/config/config.service';

import { Jsonp, Response} from '@angular/http';


@Injectable()
export class OrcidUtilService {

    constructor(
        private jsonp: Jsonp,
        private configService: ConfigService
    ) {}

    private logUserOutObserable(): Observable<Response> {
        /*
           BROKEN_CALLBACK_IS_FINE_SEE_CODE should be JSONP_CALLBACK
           https://medium.com/@FanggengYang/how-to-use-angular-2-jsonp-c75460ad614c
           but ORCID's callback filter, filters out periods '.' and ng uses names like '__ng_jsonp__.__req0.finished'.
           Way to use invalid function names angular 2!
        */
        return this.configService.getConfiguration().flatMap(
              config =>
                this.jsonp.get(config['ORCID_URL'] + '/userStatus.json?logUserOut=true&callback=BROKEN_CALLBACK_IS_FINE_SEE_CODE'));
    }

    logUserOut(): void {
        this.logUserOutObserable().subscribe(
            response => { /* do nothing */ },
            err => { /* ignore error */ }
        );
    }

    createAuth(): void {
        this.logUserOutObserable().subscribe(
            response => { window.location.href  = '/create-smid-authorize'; },
            err => { window.location.href  = '/create-smid-authorize'; }
        );
    }

    addIdAuth(pubKey: string): void {
        this.logUserOutObserable().subscribe(
            response => { window.location.href  = '/add-id-authorize/' + pubKey; },
            err => { window.location.href  = '/add-id-authorize/' + pubKey; }
        );
    }

}
