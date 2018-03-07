import { Message } from 'primeng/components/common/message';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public userID = '';

    public password = '';

    public registerVisible = false;

    constructor(
        public router: Router,
        private auth: AuthService,
        private messageService: MessageService) { }

    ngOnInit() {
    }

    login() {
      // this.router.navigate(['/home']);
        const cred = {
            userID: this.userID,
            password: this.password,
        };
        this.auth.login(cred).subscribe(
            (resp: any) => {
                console.log('Welcome' + this.auth.user.firstName);
                this.router.navigate(['/home']);
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    const herr = <HttpErrorResponse>error;
                    if (herr.status === 401) {
                        this.messageService.add({
                          severity: 'error',
                          summary: 'Invalid credentials provided',
                          detail: 'Authentication failed!'});
                    } else {
                        this.messageService.add({
                          severity: 'error',
                          summary: 'Unknown error occured',
                          detail: 'Authentication failed!'});
                    }
                }
            }
        );
    }

    onKeyEvent(event: KeyboardEvent) {
        if (event.charCode === 13) {
            this.login();
        }
    }

    showRegisterDialog() {
      this.registerVisible = true;
  }
}
