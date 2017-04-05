import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-id-error',
  templateUrl: './add-id-error.component.html',
  styleUrls: ['./add-id-error.component.scss']
})
export class AddIdErrorComponent implements OnInit {
    publicKey: string;

    collections: Collection[];

    constructor(
        private collectionService: CollectionService
    ) {
        this.publicKey = this.getParameterByName('state'); //name orcid
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
