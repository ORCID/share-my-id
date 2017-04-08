import { Injectable } from '@angular/core';

import { ConfigService } from './../../shared/config/config.service';

import { Jsonp } from '@angular/http';


@Injectable()
export class OrcidUtilService {

  constructor(
  	private jsonp: Jsonp,
    private configService: ConfigService
) { }

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
    }

}
