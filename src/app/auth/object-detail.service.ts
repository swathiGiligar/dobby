import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class ObjectDetailService {

    source = new Subject<Object>();

    observable = this.source.asObservable();

    constructor() {

    }

    show(object: Object) {
        if (object) {
            this.source.next(object);
        }
    }
}
