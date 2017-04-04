import { Component, OnInit } from '@angular/core';

import { Collection } from './../shared/collection/collection';

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
        this.getCollections();
    }
}
