import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Priority, Users, Status, Options } from '../utils/options';

@Component({
  selector: 'app-task-addition',
  templateUrl: './task-addition.component.html',
  styleUrls: ['./task-addition.component.css']
})
export class TaskAdditionComponent implements OnInit {

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  priorities: SelectItem[];
  selectedPriority: Priority;
  users: SelectItem[];
  newOwner: Users;
  statuses: SelectItem[];
  status: Status;
  options = new Options();
  desc: string;
  project: string;
  depend: string;
  comments: string;

  ngOnInit() {
    this.priorities = this.options.getPriorities();
    this.users = this.options.getUsers();
    this.statuses = this.options.getStatuses();
  }

  onSave() {
    console.log(this.selectedPriority);
    console.log(this.newOwner);
    console.log(this.status);
    console.log(this.desc);
    console.log(this.project);
    console.log(this.depend);
    console.log(this.comments);
    this.clearData();
    this.notify.emit('Close Dialog');
  }

  onCancel() {
    this.clearData();
    this.notify.emit('Close Dialog');
  }

  clearData() {
    this.selectedPriority = null;
    this.newOwner = null;
    this.status = null;
    this.desc = '';
    this.project = '';
    this.depend = '';
    this.comments = '';
  }

}
