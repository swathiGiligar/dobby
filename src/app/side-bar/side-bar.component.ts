import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  items: MenuItem[];

  display = false;
  displayUnderConstruction = false;

  showDialog() {
    this.display = true;
  }

  showUnderConstructionMessage() {
    this.displayUnderConstruction = true;
  }

  onNotify() {
    this.display = false;
  }

  ngOnInit() {
    this.items = [
      {label: 'Add Task', icon: 'fas fa-plus-square', command: (event) => {
        this.showDialog();
      }},
      {label: 'My Tasks', icon: 'fas fa-tasks', command: (event) => {
        this.showUnderConstructionMessage();
      }},
      {label: 'All Tasks', icon: 'fas fa-tasks', command: (event) => {
        this.notify.emit('Show All Tasks');
      }},
      {label: 'Filters', icon: 'fas fa-filter', command: (event) => {
        this.showUnderConstructionMessage();
      }}
    ];
  }

}
