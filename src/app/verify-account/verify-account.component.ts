import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { SecurityService } from '../auth/security.service';

@Component({
    selector: 'app-verify-account',
    templateUrl: './verify-account.component.html',
    styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
    verifyID = '';

    userID = '';

    constructor(
        private secSrv: SecurityService,
        private msgSrv: MessageService,
        private router: Router) {

    }

    ngOnInit() {
        const url = new URL(window.location.href);
        this.verifyID = url.searchParams.get('verifyID');
        this.userID = url.searchParams.get('userID');
    }

    verify(event) {
        this.secSrv.createPassword(
            this.verifyID, this.userID, event.data.password).subscribe(
            (res: any) => {
                this.msgSrv.add({
                  severity: 'success',
                  summary: 'User successfuly veryfied'
                });
                // this.router.navigate(['/']);
                window.location.assign('/');
            },
            err => {
                this.msgSrv.add({
                  severity: 'error',
                  summary: 'Failed to verify user'
                });
            });
    }

}
