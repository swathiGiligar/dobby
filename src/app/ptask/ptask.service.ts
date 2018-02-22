import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { PTASK } from './ptask.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PTASKService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<PTASK[]>('http://localhost:8080/tasks');
  }

  createTask(task: PTASK) {
    const newTask = JSON.stringify(task);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post('http://localhost:8080/tasks', newTask, httpOptions)
      .subscribe((res => console.log(res)));
  }

  updateTask(task: PTASK) {
    const updatedTask = JSON.stringify(task);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.put('http://localhost:8080/tasks', updatedTask, httpOptions)
      .subscribe((res => console.log(res)));
  }
}
