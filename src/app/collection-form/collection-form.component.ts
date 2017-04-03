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
    private publicKey: string;
    private privateKey: string;
    private response: any;

    constructor(
        private collectionService: CollectionService,
        private authInfoService: AuthInfoService,
        private route: ActivatedRoute,
        private router: Router
    ) 
    {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
        this.publicKey = route.url['_value'][0]['path'];
        this.privateKey = route.url['_value'][2]['path'];
    }

    ngOnInit() {
    }

    resetForm(): void {
        this.description = "";
        this.title = "";
        //this.ngForm.reset(); <- This is reloading the whole app, needs a fix
    }

    submitForm( form: any ): void {
        console.log("form", form);
        this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 

        this.collectionService.editCollection( form ).subscribe(
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