import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';
import { ConfigService } from './../shared/config/config.service';

@Component({
    selector: 'app-add-id-success',
    templateUrl: './add-id-success.component.html',
    styleUrls: ['./add-id-success.component.scss']
})
export class AddIdSuccessComponent implements OnInit, OnDestroy {

    public publicKey: string;
    private sub: any;
    public orcidUrl: string;
    public userOrcidId: string;

    collections: Collection[];

    constructor(
        private route: ActivatedRoute,
        private collectionService: CollectionService,
        private configService: ConfigService
    ) {
        this.configService.getConfiguration().subscribe(
            config => {
                this.orcidUrl = config['ORCID_URL'];
        });
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
