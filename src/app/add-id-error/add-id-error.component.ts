import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { CollectionService } from './../shared/collection/collection.service';

@Component({
  selector: 'app-add-id-error',
  templateUrl: './add-id-error.component.html',
  styleUrls: ['./add-id-error.component.scss']
})
export class AddIdErrorComponent implements OnInit {

    private sub: any;
    private publicKey: string;

    constructor(
        private collectionService: CollectionService,
        private route: ActivatedRoute
    ) { }

    authenticate(): void {
        // make sure the user is logged out before sending them over
        
        this.collectionService.logUserOut().subscribe(
            response => { 
                window.location.href  = '/add-id-authorize/' + this.publicKey;
            }, 
            err => { 
                // ignore error
                window.location.href  = '/add-id-authorize/' + this.publicKey;      
            }
        );
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                this.publicKey = params['publicKey'];
            }
        );     
    }

}
