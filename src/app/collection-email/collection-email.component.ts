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
    emailSubmitSuccess: boolean;
    formEmailSubmitted: boolean;
    ngForm: any;
    orcid_oauth_url: string;
    showEmailErrorMessage: boolean;
    showEmailWarningMessage: boolean;
 
    constructor(
        private collectionService: CollectionService
    ) {
        this.email = '';
        this.emailSubmitSuccess = false
        this.formEmailSubmitted = false
        this.orcid_oauth_url='';
        this.showEmailErrorMessage = false;
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
        } else {
            var formString = JSON.stringify(form);
            this.collectionService.editEmail(formString).subscribe(
                (response) => {
                    this.response = response;
                    console.log(this.response);
                    var response_parsed = JSON.parse(JSON.stringify(this.response, null, 2));
                    this.showEmailErrorMessage = false;
                    //window.location.replace(response_parsed.redirect + '&email=' + response_parsed.email);
                    this.orcid_oauth_url = response_parsed.redirect + '&email=' + response_parsed.email;
                    this.emailSubmitSuccess = true;
                },
                (err) => {
                    console.log(err);
                    this.showEmailErrorMessage = true;
                },
                () => {}
            );
        }
    }

}
