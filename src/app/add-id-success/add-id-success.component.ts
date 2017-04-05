import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-add-id-success',
    templateUrl: './add-id-success.component.html',
    styleUrls: ['./add-id-success.component.scss']
})
export class AddIdSuccessComponent implements OnInit {
    
    userOrcidId: string;
    publicKey: string;
    userName: string;

    collections: Collection[];

    constructor(
        private collectionService: CollectionService
    ) {
        this.userOrcidId = this.getParameterByName('orcid'); 
        this.publicKey = this.getParameterByName('state'); //name orcid
        this.userName = this.getParameterByName('name');
    }

    private getParameterByName(name:string): string {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        } 
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe( 
            collections => {
                this.collections = collections;
            }
        );
    }    

    ngOnInit() {
        this.getCollections();
    }

}
