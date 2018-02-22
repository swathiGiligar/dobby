import { Component, OnInit, Input } from '@angular/core';
import { PTASK } from './ptask.interface';
import { PTASKService } from './ptask.service';
import {SelectItem} from 'primeng/api';
import { Options, Priority, Users, Status } from '../utils/options';

@Component({
  selector: 'app-ptask',
  templateUrl: './ptask.component.html',
  styleUrls: ['./ptask.component.css']
})
export class PtaskComponent implements OnInit {

    @Input('task') task: PTASK;

    priorities: SelectItem[];
    selectedPriority: Priority = {id: '2', level: 'High'};
    users: SelectItem[];
    newOwner: Users = {id: '1', userName: 'Swathi'};
    statuses: SelectItem[];
    status: Status = {id: '1', status: 'Pending'};
    editable = false;

    options = new Options();

    ngOnInit() {
      this.priorities = this.options.getPriorities();
      this.users = this.options.getUsers();
      this.statuses = this.options.getStatuses();
    }

}
