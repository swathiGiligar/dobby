import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService) {

    }

    canActivate(): boolean {
        if (!this.auth.isLoggedIn()) {
            this.auth.logout();
            return false;
        }
        return true;
    }
}
