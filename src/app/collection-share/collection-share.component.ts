import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Collection } from './../shared/collection/collection';

import { ConfigService } from './../shared/config/config.service';

import { CollectionService } from './../shared/collection/collection.service';

import { OrcidUtilService } from './../shared/orcid-util/orcid-util.service';


@Component({
    selector: 'app-collection-share',
    templateUrl: './collection-share.component.html',
    styleUrls: ['./collection-share.component.scss']
})

export class CollectionShareComponent implements OnInit, OnDestroy {

    collections: Collection[];

    private collectionSubscription: any;
    private path: string[];
    private timerSubscription: any;

    public publicKey: string;
    public windowLocationOrigin: string;

    constructor(
        private collectionService: CollectionService,
        private configService: ConfigService,
        private orcidUtilService: OrcidUtilService,
    ) {
        this.path = window.location.pathname.split('/');
        this.publicKey = this.path[1];
        this.windowLocationOrigin = window.location.protocol + '//'
            + window.location.hostname + (window.location.port ? ':' + location.port : '');
    }

    private refreshData(): void {
        this.collectionService.getCollection(this.publicKey).subscribe(
            collections => {
                this.collections = collections;
                this.subscribeToData();
            }
        );
    }

    private subscribeToData(): void {
        this.timerSubscription = Observable.timer( 30000 ).subscribe(() => this.refreshData());
    }

    authenticate(): void {
        this.orcidUtilService.addIdAuth(this.publicKey);
    }

    ngOnDestroy() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        // make sure the user is logged out as soon as they are sent to this page
        this.orcidUtilService.logUserOut();
        this.refreshData();

    }
}
