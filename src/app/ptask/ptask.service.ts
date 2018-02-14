import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { PTASK } from './ptask.interface';

@Injectable()
export class PTASKService {

    constructor(private http: Http) {}

    getTasks() {
        return this.http.get('assets/data/tasks.json')
                    .toPromise()
                    .then(res => <PTASK[]> res.json().data)
                    .then(data => data);
    }
}
