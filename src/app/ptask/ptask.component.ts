import { Component, OnInit, Input } from '@angular/core';
import { PTASK } from './ptask.interface';
import { PTASKService } from './ptask.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-ptask',
  templateUrl: './ptask.component.html',
  styleUrls: ['./ptask.component.css']
})
export class PtaskComponent implements OnInit {

    @Input('task') task: PTASK;

    priorities: SelectItem[];
    selectedPriority: Priority;
    users: SelectItem[];
    newOwner: Users;
    statuses: SelectItem[];
    status: Status;
    editable = false;

    ngOnInit() {
      this.priorities = [
          {label: 'Select Priority', value: null},
          {label: 'Critical', value: {id: '1', level: 'Critical'}},
          {label: 'High', value: {id: '2', level: 'High'}},
          {label: 'Medium', value: {id: '3', level: 'Medium'}},
          {label: 'Low', value: {id: '4', level: 'Low'}}
      ];
      this.users = [
        {label: 'Select Owner', value: null},
        {label: 'Swathi', value: {id: '1', userName: 'Swathi'}},
        {label: 'Varun', value: {id: '2', userName: 'Varun'}}
      ];
      this.statuses = [
        {label: 'Select Status', value: null},
        {label: 'Pending', value: {id: '1', level: 'Pending'}},
        {label: 'In Progress', value: {id: '2', level: 'In Progress'}},
        {label: 'Blocked', value: {id: '3', level: 'Blocked'}},
        {label: 'Backlogged', value: {id: '4', level: 'Backlogged'}},
        {label: 'Up for Review', value: {id: '4', level: 'Up for Review'}},
        {label: 'Completed', value: {id: '4', level: 'Completed'}},
        {label: 'Cancelled', value: {id: '4', level: 'Cancelled'}},
    ];
    }

}

interface Priority {
  id?: string;
  level: string;
}

interface Users {
  id?: string;
  userName: string;
}

interface Status {
  id?: string;
  status: string;
}
