import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Priority, Users, Status, Options } from '../utils/options';
import { PTASK } from '../ptask/ptask.interface';
import { PTASKService } from '../ptask/ptask.service';
import { DatePipe } from '@angular/common';

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

  constructor(private pTaskService: PTASKService) { }

  ngOnInit() {
    this.priorities = this.options.getPriorities();
    this.users = this.options.getUsers();
    this.statuses = this.options.getStatuses();
  }

  onSave() {
    console.log(this.selectedPriority);
    console.log(this.newOwner);
    console.log(this.desc);
    console.log(this.project);
    console.log(this.depend);
    console.log(this.comments);

    const task = {} as PTASK;
    task.priority = this.selectedPriority.level;
    task.description = this.desc;
    task.owner = this.newOwner.userName;
    task.status = 'Pending';
    task.projectName = this.project;
    task.dependencies = this.depend;
    task.additionalInfo = this.comments;
    const pipe = new DatePipe('en-IST'); // Use your own locale
    const now = Date.now();
    const currentTime = pipe.transform(now, 'short');
    task.createdDate = currentTime;
    task.createdBy = 'US';
    this.pTaskService.createTask(task);

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
