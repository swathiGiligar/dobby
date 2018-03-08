import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output() showAllTasks: EventEmitter<string> = new EventEmitter<string>();
  @Output() showMyTasks: EventEmitter<string> = new EventEmitter<string>();
  @Output() showUserView: EventEmitter<string> = new EventEmitter<string>();

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
    this.showAllTasks.emit('Show All Tasks');
  }

  ngOnInit() {
    this.items = [
      {label: 'Add Task', icon: 'fas fa-plus-square', command: (event) => {
        this.showDialog();
      }},
      {label: 'My Tasks', icon: 'fas fa-tasks', command: (event) => {
        this.showMyTasks.emit('Show My Tasks');
      }},
      {label: 'All Tasks', icon: 'fas fa-tasks', command: (event) => {
        this.showAllTasks.emit('Show All Tasks');
      }},
      {label: 'Filters', icon: 'fas fa-filter', command: (event) => {
        this.showUnderConstructionMessage();
      }},
      {label: 'Manage Users', icon: 'fas fa-user',
        visible: this.auth.isAdminUser(),
        command: (event) => {
        this.showUserView.emit('Show USer View');
      }}
    ];
  }

}
