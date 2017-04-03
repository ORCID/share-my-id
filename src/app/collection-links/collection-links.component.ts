import { Component, OnInit } from '@angular/core';

import { Collection } from './../shared/collection/collection';

import { CollectionService } from './../shared/collection/collection.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-collection-links',
    templateUrl: './collection-links.component.html',
    styleUrls: ['./collection-links.component.scss']
})
export class CollectionLinksComponent implements OnInit {
    collections: Collection[];

    private publicKey: string;
    //private privateKey: string;

    constructor(
        private collectionService: CollectionService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.publicKey = route.url['_value'][0]['path'];
        //this.privateKey = route.url['_value'][2]['path'];
    }

    authenticate(): void {
        //this.authInfoService.loadAuthInfo();
        window.location.href  = '/add-id-authorize/' + this.publicKey;
    }

    getCollections(): void {
        this.collectionService.getCollection().subscribe( //update param to pass an actual argument 
            collections => { 
                this.collections = collections;
            }
        );
    }

    ngOnInit() {
        this.getCollections();
    }
}
