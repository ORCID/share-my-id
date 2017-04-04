import { Component, OnInit }      from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { AuthInfoService } from './../shared/auth-info/auth-info.service';


import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-collection-form',
    templateUrl: './collection-form.component.html',
    styleUrls: ['./collection-form.component.scss']
})

export class CollectionFormComponent implements OnInit {
    collection: Collection;
    description: string;
    ngForm: any;
    showErrorMessage: boolean;
    showSuccessMessage: boolean;
    title: string;
    private path: string[];
    private publicKey: string;
    private privateKey: string;
    private response: any;

    constructor(
        private collectionService: CollectionService,
        private authInfoService: AuthInfoService,
    ) 
    {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
        this.path = window.location.pathname.split("/");
        this.publicKey = this.path[1];
        this.privateKey = this.path[3];
    }

    ngOnInit() {
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