import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-collection-edit',
    templateUrl: './collection-edit.component.html',
    styleUrls: ['./collection-edit.component.scss']
})

export class CollectionEditComponent implements OnInit {
    collections: Collection[];
    description: string;
    ngForm: any;
    showErrorMessage: boolean;
    showSuccessMessage: boolean;
    title: string;
    username: string;
    uri: string;

    private path: string[];
    private publicKey: string;
    private privateKey: string;
    private response: any;
    private windowLocationOrigin: string;

    constructor(
        private collectionService: CollectionService,
    ) 
    {
        this.description = "";
        this.path = window.location.pathname.split("/");
        this.publicKey = this.path[1];
        this.privateKey = this.path[3];
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
        this.title = "";
        this.windowLocationOrigin = window.location.protocol+'//'+ window.location.hostname + (window.location.port ? ':'+location.port: ''); 
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                var collection_parsed = null;
                this.collections = collections;
                collection_parsed = JSON.parse(JSON.stringify(this.collections, null, 2));

                this.description = collection_parsed.form.description;
                this.title = collection_parsed.form.title;
                this.username = collection_parsed.owner.name;
                this.uri = collection_parsed.owner.fullOrcidId;
            }
        );
    }    

    ngOnInit() {
        this.getCollections();
    }

    submitForm( form: any ): void {
        this.collectionService.editCollection( form, this.publicKey, this.privateKey ).subscribe(
            (response) => { 
                this.response = response;
                this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 
            },
            (err)=>console.log(err),
            ()=>console.log("Submitted")
        );
    }
}