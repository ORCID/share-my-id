import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-create-collection',
    templateUrl: './create-collection.component.html',
    styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {
    
    private publicKey: string;
    private privateKey: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.publicKey = route.url['_value'][0]['path'];
        this.privateKey = route.url['_value'][2]['path'];
    }

    ngOnInit() {
    }

}
