import { ActivatedRoute } from '@angular/router';

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

    private publicKey: string;
    private response: any;
    private sub: any;
    private userOrcidId: string;

    collections: Collection[];

    constructor(
        private route: ActivatedRoute,
        private collectionService: CollectionService
    ) {
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe(
            collections => {
                this.collections = collections;
            }
        );
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.publicKey = params['publicKey'];
            this.userOrcidId = params['orcid'];
            this.getCollections();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
