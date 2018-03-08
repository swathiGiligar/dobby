import { Observable } from 'rxjs/Observable';
import { User } from '../auth/security.model';
import { murl } from '../auth/url.util';
import { HttpClient } from '@angular/common/http';
import { Result } from '../auth/basic.model';
import { PTASKService } from '../ptask/ptask.service';

export class Options {

  getPriorities() {
   return [
            {label: 'Critical', value: {level: 'Critical'}},
            {label: 'High', value: {level: 'High'}},
            {label: 'Medium', value: {level: 'Medium'}},
            {label: 'Low', value: {level: 'Low'}}
        ];
  }

  getUsers(res) {
    const usrs: UsersOptions [] = [];
    for (const user of res.data) {
      const option = {
        label: user.firstName + ' ' + user.lastName,
        value: {userName: user.firstName + ' ' + user.lastName}
      };
      usrs.push(option);
    }
    return usrs;
  }

  getStatuses() {
    return [
      {label: 'Pending', value: {status: 'Pending'}},
      {label: 'In Progress', value: {status: 'In Progress'}},
      {label: 'Blocked', value: {status: 'Blocked'}},
      {label: 'Backlogged', value: {status: 'Backlogged'}},
      {label: 'Up for Review', value: {status: 'Up for Review'}},
      {label: 'Completed', value: {status: 'Completed'}},
      {label: 'Cancelled', value: {status: 'Cancelled'}},
  ];
  }

}

export interface Priority {
  level: string;
}

export interface Users {
  userName: string;
}

export interface Status {
  status: string;
}

export interface UserList {
  total: number;
  data: User[];
}

export interface UsersOptions {
  label: string;
  value: {
        userName: string;
      };
}
