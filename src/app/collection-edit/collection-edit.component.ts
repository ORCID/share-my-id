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
    private publicKey: string;
    private privateKey: string;
    private response: any;
    private sub: any;
    private windowLocationOrigin: string;

    collections: Collection[];
    description: string;
    formEmptyOnLoad: boolean;
    formSubmitted: boolean;
    ngForm: any;
    showErrorMessage: boolean;
    showSuccessMessage: boolean;
    title: string;
    username: string;
    uri: string;

    constructor(
        private collectionService: CollectionService,
        private route: ActivatedRoute
    ) 
    {
        this.description = "";
        this.formEmptyOnLoad = true;
        this.formSubmitted = false;
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
                //console.log("collection_parsed", collection_parsed);

                this.description = collection_parsed.form.description;
                this.title = collection_parsed.form.title;
                this.username = collection_parsed.owner.name;
                this.uri = collection_parsed.owner.orcid;

                if( this.description.length > 0 && this.title.length > 0 ) {
                    this.formEmptyOnLoad = false;
                }
            }
        );
    }    

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                this.publicKey = params['publicKey'];
                this.privateKey = params['privateKey'];
                this.getCollections();
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    submitForm( form: any ): void {
        this.formSubmitted = true; 
        this.collectionService.editCollection( form, this.publicKey, this.privateKey ).subscribe(
            (response) => {
                this.response = response;
                this.showErrorMessage = false;
                this.showSuccessMessage = true; // <- Update to change the status on the ajax call result
            },
            (err)=> {
                console.log(err);
                this.showErrorMessage = true;
                this.showSuccessMessage = false;
            },
            ()=>{}
        );
    }
}