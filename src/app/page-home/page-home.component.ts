import { Component, OnInit } from '@angular/core';

import { AuthInfoService } from './../shared/auth-info/auth-info.service';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
    authenticated: boolean; //Remove/refactor

    constructor(
        private authInfoService: AuthInfoService
    ) { 
        this.authenticated = false; //Remove/refactor
    }

    //Remove/refactor
    hasParams(): void {
        this.authInfoService.hasParams().subscribe( //update param to pass an actual argument 
            authenticated => { 
                this.authenticated = authenticated;
            }
        );
    }

    authenticate(): void {
        //this.authInfoService.loadAuthInfo();
        window.location.href  = '/create-smid-authorize';
    }

    //Remove/refactor
    login(): void {
        this.loadAuthInfo();
        this.hasParams();
        //this.authenticated = this.authInfoService.hasParamas();
        //console.log("this.authenticated ", this.authenticated );
    }

    ngOnInit() {
        this.hasParams();
    }

}

