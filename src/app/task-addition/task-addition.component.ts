import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Priority, Users, Status, Options } from '../utils/options';
import { PTASK } from '../ptask/ptask.interface';
import { PTASKService } from '../ptask/ptask.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';

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

  constructor(private pTaskService: PTASKService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.priorities = this.options.getPriorities();
    this.users = this.options.getUsers();
    this.statuses = this.options.getStatuses();
  }

  onSave() {
    const task = {} as PTASK;
    task.priority = this.selectedPriority.level;
    task.description = this.desc;
    task.owner = this.newOwner.userName;
    task.status = 'Pending';
    task.projectName = this.project;
    task.dependencies = this.depend;
    task.additionalInfo = this.comments;
    const pipe = new DatePipe('en-IST');
    const now = Date.now();
    const currentTime = pipe.transform(now, 'short');
    task.createdDate = currentTime;
    task.createdBy = 'US'; // TODO update when user management is implemented.

    this.pTaskService.createTask(task).subscribe(
      res => this.showSuccessMessage(),
      error => this.showErrorMessage()
    );

    this.close();

    this.notify.emit('Close Dialog');
  }

  close() {
    this.selectedPriority = null;
    this.newOwner = null;
    this.status = null;
    this.desc = '';
    this.project = '';
    this.depend = '';
    this.comments = '';

    this.notify.emit('Close Dialog');
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Task Added Successfully.'
    });
  }

  showErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error adding new task.'
    });
  }

}
