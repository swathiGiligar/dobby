import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PTASK } from './ptask.interface';
import { PTASKService } from './ptask.service';
import {SelectItem} from 'primeng/api';
import { Options, Priority, Users, Status } from '../utils/options';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-ptask',
  templateUrl: './ptask.component.html',
  styleUrls: ['./ptask.component.css'],
})
export class PtaskComponent implements OnInit {

    @Input('task') task: PTASK;

    priorities: SelectItem[];
    selectedPriority: Priority;
    users: SelectItem[];
    newOwner: Users;
    statuses: SelectItem[];
    status: Status;
    desc: string;
    depend: string;
    project: string;
    comments: string;

    editable = false;

    options = new Options(this.pTaskService);

    constructor(private pTaskService: PTASKService,
      private messageService: MessageService) { }

    showSuccessMessage() {
      this.messageService.add({
        severity: 'success',
        summary: 'Task Updated Successfully.'
      });
    }

    showErrorMessage() {
      this.messageService.add({
        severity: 'error',
        summary: 'Error updating task.'
      });
    }

    ngOnInit() {
      this.setValues();
    }

    setValues() {
      this.priorities = this.options.getPriorities();
      const allUsers = this.pTaskService.getAllUsers();
      allUsers.subscribe(
      res => {
        if (res.total > 0) {
            this.users = this.options.getUsers(res);
          }
        }
      );
      this.statuses = this.options.getStatuses();
      this.desc = this.task.description;
      this.depend = this.task.dependencies;
      this.project = this.task.projectName;
      this.comments = this.task.additionalInfo;
      this.selectedPriority = {
        level: this.task.priority
      };
      this.newOwner = {
        userName: this.task.owner
      };
      this.status = {
        status: this.task.status
      };
    }

    updateTask() {
      const taskToUpdate = {} as PTASK;
      taskToUpdate.id = this.task.id;
      taskToUpdate.additionalInfo = this.comments;
      taskToUpdate.dependencies = this.depend;
      taskToUpdate.description = this.desc;
      taskToUpdate.owner = this.newOwner.userName;
      taskToUpdate.priority = this.selectedPriority.level;
      taskToUpdate.projectName = this.project;
      taskToUpdate.status = this.status.status;
      taskToUpdate.createdBy = this.task.createdBy;
      taskToUpdate.createdDate = this.task.createdDate;

      this.pTaskService.updateTask(taskToUpdate).subscribe(
        res => this.showSuccessMessage(),
        error => this.showErrorMessage()
      );

      this.editable = false;

      this.task = taskToUpdate;
    }

    onCancel() {
      this.setValues();

      this.editable = false;
    }
}
