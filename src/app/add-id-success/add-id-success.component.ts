import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-add-id-success',
    templateUrl: './add-id-success.component.html',
    styleUrls: ['./add-id-success.component.scss']
})
export class AddIdSuccessComponent implements OnInit {
    private path: string[];
    private publicKey: string;
    private response: any;
    private windowLocationOrigin: string;

    collections: Collection[];

    constructor(
        private collectionService: CollectionService
    ) {
        this.path = window.location.search.split("?");
        this.publicKey = this.path[1].split("=")[1]; //Make this prettier
        this.windowLocationOrigin = window.location.protocol+'//'+ window.location.hostname + (window.location.port ? ':'+location.port: ''); 
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                var collection_parsed = null;
                this.collections = collections;
                collection_parsed = JSON.parse(JSON.stringify(this.collections, null, 2));
            }
        );
    }    

    ngOnInit() {
        this.getCollections();
    }

}
