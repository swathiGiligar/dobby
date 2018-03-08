import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AuthLevel } from '../auth/security.model';

@Injectable()
export class FormatService {
    readonly ACCESS_STRING = [
        'Super',
        'Admin',
        'Normal',
        'Monitor',
        'Outsider',
    ];

    constructor() { }

    formatTime(d: Date) {
        return moment(d).format('DD MMM YYYY hh:mm:ss');
    }

    formatAccess(a: AuthLevel): string {
        const accessNum = <number>a;
        if (accessNum < 5) {
            return this.ACCESS_STRING[accessNum];
        }
        return 'Invalid';
    }

}
