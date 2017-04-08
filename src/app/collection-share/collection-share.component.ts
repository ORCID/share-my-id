import { Component, OnInit } from '@angular/core';

import { Collection } from './../shared/collection/collection';

import { ConfigService } from './../shared/config/config.service';

import { CollectionService } from './../shared/collection/collection.service';

import { OrcidUtilService } from './../shared/orcid-util/orcid-util.service';


@Component({
    selector: 'app-collection-share',
    templateUrl: './collection-share.component.html',
    styleUrls: ['./collection-share.component.scss']
})

export class CollectionShareComponent implements OnInit {

    collections: Collection[];

    private path: string[];
    private publicKey: string;
    private windowLocationOrigin: string;

    constructor(
        private collectionService: CollectionService,
        private configService: ConfigService,
        private orcidUtilService: OrcidUtilService,
    ) {
        this.path = window.location.pathname.split("/");
        this.publicKey = this.path[1];
        this.windowLocationOrigin = window.location.protocol+'//'+ window.location.hostname + (window.location.port ? ':'+location.port: ''); 
    }

    authenticate(): void {
        this.orcidUtilService.addIdAuth(this.publicKey);
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                this.collections = collections;
            }
        );
    }

    ngOnInit() {
        // make sure the user is logged out as soon as they are sent to this page
        this.orcidUtilService.logUserOut()
        this.getCollections();
    }
}
