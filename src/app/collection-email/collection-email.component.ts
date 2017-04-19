import { Component, OnInit } from '@angular/core';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
  selector: 'app-collection-email',
  templateUrl: './collection-email.component.html',
  styleUrls: ['./collection-email.component.scss']
})
export class CollectionEmailComponent implements OnInit {
    public publicKey: string;
    public privateKey: string;
    private response: any;

    email: string;
    formEmailSubmitted: boolean;
    ngForm: any;
    showEmailErrorMessage: boolean;
    showEmailSuccessMessage: boolean;
    showEmailWarningMessage: boolean;
 
    constructor(
        private collectionService: CollectionService
    ) {
        this.email = '';
        this.formEmailSubmitted = false
        this.showEmailErrorMessage = false;
        this.showEmailSuccessMessage = false;
        this.showEmailWarningMessage = false;
    }

  ngOnInit() {
  }

  submitEmail( form: any ): void {
        this.formEmailSubmitted = true;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(form.email) == false) {
            console.log("invalid email");
            this.showEmailErrorMessage = true;
            this.showEmailSuccessMessage = false;
        } else {
            var formString = JSON.stringify(form);
            this.collectionService.editEmail( formString, this.publicKey, this.privateKey ).subscribe(
                (response) => {
                    this.response = response;
                    console.log(this.response);
                    this.showEmailErrorMessage = false;
                    this.showEmailSuccessMessage = true; // <- Update to change the status on the ajax call result
                },
                (err) => {
                    console.log(err);
                    this.showEmailErrorMessage = true;
                    this.showEmailSuccessMessage = false;
            
                },
                () => {}
            );
        }
    }

}
