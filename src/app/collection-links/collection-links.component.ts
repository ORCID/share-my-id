import { Component, OnInit } from '@angular/core';

import { Collection } from './../shared/collection/collection';

import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-collection-links',
    templateUrl: './collection-links.component.html',
    styleUrls: ['./collection-links.component.scss']
})
export class CollectionLinksComponent implements OnInit {
    collections: Collection[];

    constructor(private collectionService: CollectionService) { }

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
