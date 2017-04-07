import { Component, OnInit } from '@angular/core';

import { ConfigService } from './../shared/config/config.service';

import { OrcidUtilService } from './../shared/orcid-util/orcid-util.service';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

    constructor(
       private orcidUtilService: OrcidUtilService,
       private configService: ConfigService
    ) {}

    authenticate(): void {
        this.orcidUtilService.logUserOut().subscribe(
            response => { 
                window.location.href  = '/create-smid-authorize';
            },
            err => {
                // ignore error
                window.location.href  = '/create-smid-authorize';
            }
        );
    }

    ngOnInit() {
        // make sure the user is logged out as soon as they are sent to this page
        this.orcidUtilService.logUserOut().subscribe(
            response => { /* do nothing */ },
            err => { /* ignore error */ }
        );
    }

}

