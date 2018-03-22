import { Component, OnInit } from '@angular/core';
import { PTASKService } from '../ptask/ptask.service';
import { PTASK } from '../ptask/ptask.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Modes } from '../side-bar/side-bar.component';


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

  constructor(private pTaskService: PTASKService,
    private auth: AuthService) { }

  displayAllTasks() {
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
      { field: 'status', header: 'Status' },
      { field: 'priority', header: 'Priority' },
      { field: 'owner', header: 'Owner' },
      // { field: 'projectName', header: 'Project Name' },
      // { field: 'dependencies', header: 'Dependencies' },
      // { field: 'additionalInfo', header: 'Additional Info' },
      // { field: 'createdBy', header: 'Created By' },
      // { field: 'createdDate', header: 'Created Date' }
  ];
    this.displayMyTasks();
  }
}
