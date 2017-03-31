import { Component, OnInit }      from '@angular/core';

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

    constructor(
        private collectionService: CollectionService
    ) 
    {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
    }

    ngOnInit() {
    }

    resetForm(): void {
        this.description = "";
        this.title = "";
        //this.ngForm.reset(); <- This is reloading the whole app, needs a fix
    }

    submitForm(form: any): void {
        this.showSuccessMessage = true; // <- Update to change the status on the ajax call result 
        this.collectionService.editCollection("", "");
        this.resetForm(); // <- Update to change the status on the ajax call result 
    }
}
