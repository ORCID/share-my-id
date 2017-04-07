import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrcidUtilService } from './../shared/orcid-util/orcid-util.service';

@Component({
  selector: 'app-add-id-error',
  templateUrl: './add-id-error.component.html',
  styleUrls: ['./add-id-error.component.scss']
})
export class AddIdErrorComponent implements OnInit {

    private sub: any;
    public publicKey: string;

    constructor(
        private orcidUtilService: OrcidUtilService,
        private route: ActivatedRoute
    ) { }

    authenticate(): void {
        // make sure the user is logged out before sending them over
        
        this.orcidUtilService.logUserOut().subscribe(
            response => { 
                window.location.href  = '/add-id-authorize/' + this.publicKey;
            }, 
            err => { 
                // ignore error
                window.location.href  = '/add-id-authorize/' + this.publicKey;      
            }
        );
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                this.publicKey = params['publicKey'];
            }
        );     
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
