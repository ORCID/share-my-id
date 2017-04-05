import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Collection } from './../shared/collection/collection';

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
        // make sure the user is logged out before sending them over
        
        this.collectionService.logUserOut().subscribe(
            response => { 
                window.location.href  = '/add-id-authorize' + this.publicKey;
            }, 
            err => { 
                // ignore error
                window.location.href  = '/add-id-authorize' + this.publicKey;      
            }
        );
        
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
        this.collectionService.logUserOut().subscribe(
            response => {
                // do nothing
            },
            err => { 
                // ignore error  
            }  
        );
        this.getCollections();
    }
}
