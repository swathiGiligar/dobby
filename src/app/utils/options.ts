import { Observable } from 'rxjs/Observable';
import { User } from '../auth/security.model';
import { murl } from '../auth/url.util';
import { HttpClient } from '@angular/common/http';
import { Result } from '../auth/basic.model';
import { PTASKService } from '../ptask/ptask.service';

export class Options {

  constructor(private ptaskService: PTASKService) { }

  getPriorities() {
   return [
            // {label: 'Select Priority', value: null},
            {label: 'Critical', value: {level: 'Critical'}},
            {label: 'High', value: {level: 'High'}},
            {label: 'Medium', value: {level: 'Medium'}},
            {label: 'Low', value: {level: 'Low'}}
        ];
  }

  getUsers() {
    const usrs: UsersOptions [] = [];
    const allUsers = this.ptaskService.getAllUsers();
    allUsers.subscribe(
      res => {
        if (res.total > 0) {
          for (const user of res.data) {
            // const option: UsersOptions = <UsersOptions>{};
            const option = {
              label: user.firstName + ' ' + user.lastName,
              value: {userName: user.firstName + ' ' + user.lastName}
            };
            usrs.push(option);
          }
        }
      }
    );
    return usrs;
    // return [
    //   {label: 'Select Owner', value: null},
    //   {label: 'Swathi Giligar', value: {userName: 'Swathi Giligar'}},
    //   {label: 'Varun Amachi', value: {userName: 'Varun Amachi'}}
    // ];
  }

  getStatuses() {
    return [
      // {label: 'Select Status', value: null},
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
