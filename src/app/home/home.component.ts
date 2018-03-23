import { Component, OnInit } from '@angular/core';
import { PTASKService } from '../ptask/ptask.service';
import { PTASK } from '../ptask/ptask.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Modes } from '../side-bar/side-bar.component';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Options, Status } from '../utils/options';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tasks: PTASK[];
  progressBar = false;
  taskView = true;
  userView = false;
  detailedTaskView = false;
  cols: any[];
  selectedTask: PTASK;
  mode = Modes.MY_TASKS;
  sortStatus = 'UNS';
  sortOthers = 'cellStyle';

  statuses: SelectItem[] = new Options().getStatuses();
  status: Status;

  constructor(private pTaskService: PTASKService,
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  displayAllTasks() {
    if (this.cols.length === 2) {
      this.cols.push({field: 'owner', header: 'Owner'});
    }
    this.sortStatus = 'UNS';
    this.showTaskView();
    this.progressBar = true;
    this.pTaskService.getTasks().subscribe(res => {
      this.tasks = res;
      this.progressBar = false;
    });
    this.mode = Modes.ALL_TASKS;
  }

  displayTasks(mode: Modes) {
    switch (mode) {
      case Modes.ALL_TASKS: {
                              this.displayAllTasks();
                              break;
                            }
      case Modes.MY_TASKS: {
                              this.displayMyTasks();
                              break;
                            }
      default: {
                this.displayAllTasks();
              }
    }
  }

  displayMyTasks() {
    if (this.cols.length === 3) {
      this.cols.pop();
    }
    this.sortStatus = 'UNS';
    this.showTaskView();
    this.progressBar = true;
    const user = this.auth.user.firstName + ' ' + this.auth.user.lastName;
    this.pTaskService.myTasks(user).subscribe(res => {
      this.tasks = res;
      this.progressBar = false;
    });
    this.mode = Modes.MY_TASKS;
  }

  showUserView() {
    this.taskView = false;
    this.detailedTaskView = false;
    this.userView = true;
    this.mode = Modes.USER_MGMT;
  }

  showTaskView() {
    this.taskView = true;
    this.userView = false;
    this.detailedTaskView = false;
  }

  showDetailedTask(task: PTASK) {
    this.selectedTask = task;
    this.taskView = false;
    this.detailedTaskView = true;
  }

  ngOnInit() {
    this.cols = [
      { field: 'description', header: 'Description' },
      // { field: 'status', header: 'Status' },
      { field: 'priority', header: 'Priority' },
      // { field: 'owner', header: 'Owner' },
      // { field: 'projectName', header: 'Project Name' },
      // { field: 'dependencies', header: 'Dependencies' },
      // { field: 'additionalInfo', header: 'Additional Info' },
      // { field: 'createdBy', header: 'Created By' },
      // { field: 'createdDate', header: 'Created Date' }
  ];

    this.displayMyTasks();
  }

  sortOnStatus() {
    this.sortOthers = 'cellStyle';
    if (this.sortStatus === 'ASC') {
      this.tasks = this.tasks.sort(this.sortDescending);
      this.sortStatus = 'DESC';
    } else {
      this.tasks = this.tasks.sort(this.sortAscending);
      this.sortStatus = 'ASC';
    }
  }

  sortAscending(aTask: PTASK, anotherTask: PTASK): number {
    if (aTask.status < anotherTask.status) {
      return -1;
    }
    if (aTask.status > anotherTask.status) {
      return 1;
    }
    return 0;
  }

  sortDescending(aTask: PTASK, anotherTask: PTASK): number {
    if (aTask.status > anotherTask.status) {
      return -1;
    }
    if (aTask.status < anotherTask.status) {
      return 1;
    }
    return 0;
  }

  initEdit(event) {
    // console.log('Hit Edit ' + event.data.status);
    this.status = {'status': event.data.status};
  }

  saveChanges(event) {
    const task: PTASK = event.data;
    // console.log('Hit Save ' + this.status.status);
    this.confirmEdit(task, this.status.status);
  }

  confirmEdit(task: PTASK, newStatus: string) {
    const oldStatus = task.status;
    this.confirmationService.confirm({
      message: 'Do you want to Change the status of this task from <b>' +
                task.status + '</b> to <b>' + newStatus + '</b>?',
      header: 'Update Confirmation',
      icon: 'fa fa-edit',
      accept: () => {
          task.status = newStatus;
          this.pTaskService.updateTask(task).subscribe(
            res => {
              this.showSuccessMessage('Task status updated');
            },
           error => {
             this.showErrorMessage('Error updating status');
            }
          );
        },
      reject: () => {
        this.status = {status: oldStatus};
      }
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

  resetStatusHead(statusead) {
    this.sortStatus = 'UNS';
  }

}
