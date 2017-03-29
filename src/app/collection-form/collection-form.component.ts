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

    constructor(
        private collectionService: CollectionService
    ) 
    {

    }

    ngOnInit() {
    }

    submitForm(form: any): void{
        console.log('Form Data: ');
        console.log(form);
        this.collectionService.addCollection("", "");
    }
}
