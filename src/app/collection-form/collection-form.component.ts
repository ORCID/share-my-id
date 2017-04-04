import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-collection-form',
    templateUrl: './collection-form.component.html',
    styleUrls: ['./collection-form.component.scss']
})

export class CollectionFormComponent implements OnInit {
    collections: Collection[];
    description: string;
    ngForm: any;
    showErrorMessage: boolean;
    showSuccessMessage: boolean;
    title: string;

    private path: string[];
    private publicKey: string;
    private privateKey: string;
    private response: any;
    private windowLocationOrigin: string;

    constructor(
        private collectionService: CollectionService,
    ) 
    {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
        this.path = window.location.pathname.split("/");
        this.publicKey = this.path[1];
        this.privateKey = this.path[3];
        this.windowLocationOrigin = window.location.protocol+'//'+ window.location.hostname + (window.location.port ? ':'+location.port: ''); 
    }

    getCollections(): void {
        console.log("get collections", this.publicKey);
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                var collection_parsed = null;
                this.collections = collections;
                collection_parsed = JSON.parse(JSON.stringify(this.collections, null, 2));
                console.log("collection_parsed", collection_parsed);
                this.title = collection_parsed.form.title;
                this.description = collection_parsed.form.description;
            }
        );
    }    

    ngOnInit() {
        console.log("init");
        this.getCollections();
    }

    submitForm( form: any ): void {
        this.collectionService.editCollection( form, this.publicKey, this.privateKey ).subscribe(
            (response) => { 
                this.response = response;
                console.log(this.response, response);
                this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 
            },
            (err)=>console.log(err),
            ()=>console.log("Done")
        );
    }
}