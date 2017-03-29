import { Component, OnInit } from '@angular/core';

import { AuthInfoService } from './../shared/auth-info/auth-info.service';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
    authenticated: boolean;

    constructor(
        private authInfoService: AuthInfoService
    ) { 
        this.authenticated = false;
    }

    hasParams(): void {
        this.authInfoService.hasParams().subscribe( //update param to pass an actual argument 
            authenticated => { 
                this.authenticated = authenticated;
            }
        );
    }

    loadAuthInfo(): void {
        this.authInfoService.loadAuthInfo();
    }

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

