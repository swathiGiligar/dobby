import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import { Priority, Users, Status, Options } from '../utils/options';
import { PTASK } from '../ptask/ptask.interface';
import { PTASKService } from '../ptask/ptask.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from '../auth/auth.service';

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
  options: Options;
  desc: string;
  project: string;
  depend: string;
  comments: string;
  currentUser: string;
  taskAdditionForm: FormGroup;

  constructor(private pTaskService: PTASKService,
              private messageService: MessageService,
              private auth: AuthService,
              private fb: FormBuilder) {
      this.currentUser = this.auth.user.firstName + ' ' + this.auth.user.lastName;
      this.createFormGroup();
    }

  ngOnInit() {
    this.options = new Options();
    this.priorities = this.options.getPriorities();
    this.statuses = this.options.getStatuses();
    const allUsers = this.pTaskService.getAllUsers();
    allUsers.subscribe(
      res => {
        if (res.total > 0) {
            this.users = this.options.getUsers(res);
            this.newOwner = {
              userName: this.currentUser
            };
          }
        }
      );
  }

  createFormGroup() {
    this.taskAdditionForm = this.fb.group({
      'desc': new FormControl('', Validators.required),
      'project': new FormControl('', Validators.required),
      'newOwner': new FormControl('', Validators.required),
      'selectedPriority': new FormControl('', Validators.required),
      'depend': new FormControl(''),
      'comments': new FormControl('')
    });
  }

  onSave() {
    const task = this.getNewTaskData();

    this.pTaskService.createTask(task).subscribe(
      res =>  this.showSuccessMessage(),
      error =>  this.showErrorMessage(),
      () => {
            this.close();
            this.notify.emit('Close Dialog');
          }
    );
  }

  private getNewTaskData() {
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
    task.createdBy = this.currentUser;
    return task;
  }

  close() {
    this.resetData();

    this.notify.emit('Close Dialog');
  }

  private resetData() {
    this.selectedPriority = null;
    this.status = null;
    this.desc = '';
    this.project = '';
    this.depend = '';
    this.comments = '';
    const currentUser = this.auth.user.firstName + ' ' + this.auth.user.lastName;
    this.newOwner = {
      userName: currentUser
    };
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
