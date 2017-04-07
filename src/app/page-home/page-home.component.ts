import { Component, OnInit } from '@angular/core';

import { ConfigService } from './../shared/config/config.service';

import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

    constructor(
       private collectionService: CollectionService,
       private configService: ConfigService
    ) {}

    authenticate(): void {
        this.collectionService.logUserOut().subscribe(
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
        this.collectionService.logUserOut().subscribe(
            response => { /* do nothing */},
            err => { /* ignore error /*}
        );
    }

}

