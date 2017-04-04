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
    private _windowLocationOrigin: string;

    constructor(
        private collectionService: CollectionService,
    ) 
    {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
        this.path = window.location.pathname.split("/");
        this.publicKey = this.path[1];
        this.privateKey = this.path[3];
        this._windowLocationOrigin = window.location.protocol+'//'+ window.location.hostname + (window.location.port ? ':'+location.port: ''); 
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
            this.collections = collections;
            var collection_parsed = JSON.parse(JSON.stringify(this.collections, null, 2));
            this.title = collection_parsed.form.title;
            this.description = collection_parsed.form.description;
        });
    }    

    ngOnInit() {
        this.getCollections();
    }

    resetForm(): void {
        this.description = "";
        this.title = "";
        //this.ngForm.reset(); <- This is reloading the whole app, needs a fix
    }

    submitForm( form: any ): void {
        this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 

        this.collectionService.editCollection( form, this.publicKey, this.privateKey ).subscribe(
            (response) => { 
                this.response = response;
                console.log(this.response, response);
            },
            (err)=>console.log(err),
            ()=>console.log("Done")
        );
        this.resetForm(); // <- Update to change the status on the ajax call result 
    }
}