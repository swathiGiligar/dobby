import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { PTASK } from './ptask.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserList } from '../utils/options';
import { murl } from '../auth/url.util';
import { Result } from '../auth/basic.model';

@Injectable()
export class PTASKService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:4200/dobby/api/v0/in/r2/dobby/tasks';

  getTasks() {
    return this.http.get<PTASK[]>(this.url);
  }

  createTask(task: PTASK) {
    const newTask = JSON.stringify(task);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.url, newTask, httpOptions);
  }

  updateTask(task: PTASK) {
    const updatedTask = JSON.stringify(task);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.url, updatedTask, httpOptions);
  }

  deleteTask(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  myTasks(user: string) {
    return this.http.get<PTASK[]>(this.url + '/users/' + user);
  }

  getAllUsers(): Observable<UserList> {
    const url = murl('uman/user' + '?offset=' + '0' + '&limit=' + '1000'
    + '&filter=' + '');
    return this.http.get(url).map(
        (resp: Result) => {
            if (resp.ok) {
                return <UserList>resp.data;
            }
            return { total: 0, data: [] };
        }
    );
  }
}
