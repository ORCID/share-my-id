import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

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

    private collectionSubscription: any;
    private path: string[];
    private publicKey: string;
    private timerSubscription: any;
    private windowLocationOrigin: string;

    constructor(
        private collectionService: CollectionService,
        private http: Http,
        private configService: ConfigService
    ) {
        this.path = window.location.pathname.split("/");
        this.publicKey = this.path[1];
        this.windowLocationOrigin = window.location.protocol+'//'+ window.location.hostname + (window.location.port ? ':'+location.port: ''); 
    }

    private refreshData(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                console.log("called");
                this.collections = collections;
                this.subscribeToData();
            }
        );
    }

    private subscribeToData(): void {
        this.timerSubscription = Observable.timer( 0, 30000 ).subscribe(() => this.refreshData());
    }

    authenticate(): void {
        // make sure the user is logged out before sending them over
        
        this.collectionService.logUserOut().subscribe(
            response => { 
                window.location.href  = '/add-id-authorize/' + this.publicKey;
            }, 
            err => { 
                // ignore error
                window.location.href  = '/add-id-authorize/' + this.publicKey;      
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
        this.subscribeToData();
    }

    public ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
}
