import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {

  @Output() showAllTasks: EventEmitter<Modes> = new EventEmitter<Modes>();
  @Output() showMyTasks: EventEmitter<Modes> = new EventEmitter<Modes>();
  @Output() showUserView: EventEmitter<Modes> = new EventEmitter<Modes>();

  mode = Modes.MY_TASKS;

  items: MenuItem[];

  display = false;
  displayUnderConstruction = false;

  constructor(private auth: AuthService) {}

  showDialog() {
    this.display = true;
  }

  showUnderConstructionMessage() {
    this.displayUnderConstruction = true;
  }

  onNotify() {
    this.display = false;
    switch (this.mode) {
      case Modes.ALL_TASKS: {
                              this.showAllTasks.emit(Modes.MY_TASKS);
                              break;
                            }
      case Modes.MY_TASKS: {
                            this.showMyTasks.emit(Modes.MY_TASKS);
                              break;
                            }
      case Modes.USER_MGMT: {
        this.showUserView.emit(Modes.USER_MGMT);
          break;
        }
      default: {
                this.showMyTasks.emit(Modes.MY_TASKS);
              }
    }
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Add Task',
        icon: 'fas fa-plus-square',
        command: (event) => {
        this.showDialog();
      }},
      {label: 'My Tasks', icon: 'fas fa-tasks', command: (event) => {
        this.showMyTasks.emit(Modes.MY_TASKS);
        this.mode = Modes.MY_TASKS;
      }},
      {label: 'All Tasks', icon: 'fas fa-tasks', command: (event) => {
        this.showAllTasks.emit(Modes.ALL_TASKS);
        this.mode = Modes.ALL_TASKS;
      }},
      {label: 'Filters', icon: 'fas fa-filter', command: (event) => {
        this.showUnderConstructionMessage();
      }},
      {label: 'Manage Users', icon: 'fas fa-user',
        visible: this.auth.isAdminUser(),
        command: (event) => {
        this.showUserView.emit(Modes.USER_MGMT);
        this.mode = Modes.USER_MGMT;
      }}
    ];
  }

}

export enum Modes {
  ALL_TASKS = 1,
  MY_TASKS,
  USER_MGMT
}
