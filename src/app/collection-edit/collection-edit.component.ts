import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Collection } from './../shared/collection/collection';
import { CollectionService } from './../shared/collection/collection.service';

@Component({
    selector: 'app-collection-edit',
    templateUrl: './collection-edit.component.html',
    styleUrls: ['./collection-edit.component.scss']
})

export class CollectionEditComponent implements OnInit, OnDestroy {
    public publicKey: string;
    public privateKey: string;
    private response: any;
    private sub: any;
    public windowLocationOrigin: string;

    collections: Collection[];
    description: string;
    email: string;
    fullOrcidId: string;
    formEmailSubmitted: boolean;
    formEmptyOnLoad: boolean;
    formSubmitted: boolean;
    ngForm: any;
    orcid: string;
    showAdminLinkCopied: boolean;
    showEmailErrorMessage: boolean;
    showEmailSuccessMessage: boolean;
    showEmailWarningMessage: boolean;
    showErrorMessage: boolean;
    showShareLinkCopied: boolean;
    showSuccessMessage: boolean;
    showWarningMessage: boolean;
    title: string;
    username: string;

    constructor(
        private collectionService: CollectionService,
        private route: ActivatedRoute
    ) {
        this.description = '';
        this.email = '';
        this.formEmailSubmitted = false
        this.formEmptyOnLoad = true;
        this.formSubmitted = false;
        this.showAdminLinkCopied = false;
        this.showEmailErrorMessage = false;
        this.showEmailSuccessMessage = false;
        this.showEmailWarningMessage = false;
        this.showErrorMessage = false;
        this.showShareLinkCopied = false;
        this.showSuccessMessage = false;
        this.showWarningMessage = false;
        this.title = '';
        this.windowLocationOrigin = window.location.protocol + '//'
            + window.location.hostname + (window.location.port ? ':' + location.port : '');
    }

    copyLinks(linkId): void {
        const collectionLinks = document.querySelector('#' + linkId);
        const range = document.createRange();
        range.selectNode(collectionLinks);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        if(linkId == 'admin-link') {
            this.showAdminLinkCopied = true;
        } else {
            this.showAdminLinkCopied = false;
        }
        if(linkId == 'share-link') {
            this.showShareLinkCopied = true;
        } else {
            this.showShareLinkCopied = false;
        }
    }

    getCollections(): void {
        this.collectionService.getCollection(this.publicKey).subscribe(
            collections => {
                let collection_parsed = null;
                this.collections = collections;
                collection_parsed = JSON.parse(JSON.stringify(this.collections, null, 2));
                // console.log("collection_parsed", collection_parsed);

                this.description = collection_parsed.form.description;
                this.fullOrcidId = collection_parsed.owner.fullOrcidId;
                this.orcid = collection_parsed.owner.orcid;
                this.title = collection_parsed.form.title;
                this.username = collection_parsed.owner.name;

                if ( this.description.length > 0 && this.title.length > 0 ) {
                    this.formEmptyOnLoad = false;
                }
            }
        );
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                this.publicKey = params['publicKey'];
                this.privateKey = params['privateKey'];
                this.getCollections();
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    submitForm( form: any ): void {
        this.formSubmitted = true;
        this.collectionService.editCollection( form, this.publicKey, this.privateKey ).subscribe(
            (response) => {
                this.response = response;
                this.showErrorMessage = false;
                this.showSuccessMessage = true; // <- Update to change the status on the ajax call result
            },
            (err) => {
                console.log(err);
                this.showErrorMessage = true;
                this.showSuccessMessage = false;
            },
            () => {}
        );
    }
}
