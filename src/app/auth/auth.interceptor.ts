import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(r: HttpRequest<any>, n: HttpHandler): Observable<any> {
        return n.handle(r).do(
            event => { },
            error => {
                if (error instanceof HttpErrorResponse) {
                    const herr = <HttpErrorResponse>error;
                    if (herr.status === 401 && this.router.url !== '/') {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        this.router.navigate(['/']);
                    }
                }
            }
        );
    }

}
