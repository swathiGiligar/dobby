import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Response} from '@angular/http';
import { PTASK } from './ptask.interface';

@Injectable()
export class PTASKService {

    // constructor(private http: HttpClient ) {}
    constructor(private http: Http ) {}

    getTasks() {

        // console.log('Swathis:' + this.http.get<PTASK[]>('http://localhost:8080/tasks'));
        // return this.http.get<PTASK[]>('http://localhost:8080/tasks');
        return this.http.get('assets/data/tasks.json')
                    .toPromise()
                    .then(res => <PTASK[]> res.json().data)
                    .then(data => data);

    }
}
