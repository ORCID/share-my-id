import { Component, OnInit } from '@angular/core';

import { Collection } from './../shared/collection/collection';

import { Http } from '@angular/http';

import { ConfigService } from './../shared/config/config.service';

import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-collection-share',
    templateUrl: './collection-share.component.html',
    styleUrls: ['./collection-share.component.scss']
})

export class CollectionShareComponent implements OnInit {

    collections: Collection[];

    private publicKey: string;

    constructor(
        private collectionService: CollectionService,
        private http: Http,
        private configService: ConfigService
    ) {
        this.publicKey = window.location.pathname;
    }

    authenticate(): void {
        window.location.href  = '/add-id-authorize' + this.publicKey;
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                this.collections = collections;
            }
        );
    }

    ngOnInit() {
        this.configService.getConfiguration().subscribe(data => {
           alert(data['ORCID_URL']);
        });
        this.configService.getConfiguration().subscribe(data => {
           alert(data['ORCID_URL']);
        });

    }
}
