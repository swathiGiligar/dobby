import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PTASK } from './ptask.interface';
import { PTASKService } from './ptask.service';
import {SelectItem} from 'primeng/api';
import { Options, Priority, Users, Status } from '../utils/options';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-ptask',
  templateUrl: './ptask.component.html',
  styleUrls: ['./ptask.component.css'],
})
export class PtaskComponent implements OnInit {

    @Input('task') task: PTASK;
    @Output() showMyTasks: EventEmitter<string> = new EventEmitter<string>();

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

    options = new Options();

    updateForm: FormGroup;

    constructor(private pTaskService: PTASKService,
      private messageService: MessageService,
      private fb: FormBuilder,
      private confirmationService: ConfirmationService ) {
          this.updateForm = this.fb.group({
            'desc': new FormControl('', Validators.required),
            'project': new FormControl('', Validators.required),
            'newOwner': new FormControl('', Validators.required),
            'selectedPriority': new FormControl('', Validators.required),
            'depend': new FormControl(''),
            'comments': new FormControl(''),
            'status': new FormControl('', Validators.required)
          });
      }

    showSuccessMessage(message: string) {
      this.messageService.add({
        severity: 'success',
        summary: message
      });
    }

    showErrorMessage(message: string) {
      this.messageService.add({
        severity: 'error',
        summary: message
      });
    }

    ngOnInit() {
      this.setInitailValues();
    }

    setInitailValues() {
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
      const taskToUpdate = this.getUpdatedData();

      this.pTaskService.updateTask(taskToUpdate).subscribe(
        res => {
          this.showSuccessMessage('Task Updated Successfully.');
          this.task = taskToUpdate;
        },
        error => this.showErrorMessage('Error updating task.'),
        () => this.editable = false
      );
    }

  private getUpdatedData() {
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
    return taskToUpdate;
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
          this.pTaskService.deleteTask(this.task.id).subscribe(
            res => {
              this.showSuccessMessage('Task deleted successfully');
              this.showMyTasks.emit('Show my tasks');
            },
            error => this.showErrorMessage('Error while deleting task')
          );
        },
      reject: () => {
      }
  });
  }

    onCancel() {
      this.setInitailValues();

      this.editable = false;
    }
}
