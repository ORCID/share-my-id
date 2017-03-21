import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Collection } from './../collection';

import { CollectionService } from './../collection.service';

@Component({
    selector: 'app-collection-form',
    templateUrl: './collection-form.component.html',
    styleUrls: ['./collection-form.component.scss']
})

export class CollectionFormComponent implements OnInit {
    collection: Collection;

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) 
    {}

    ngOnInit() {
        console.log('params', this.route.params);
    }

}
