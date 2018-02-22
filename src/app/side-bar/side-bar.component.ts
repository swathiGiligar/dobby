import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items: MenuItem[];

  display = false;

  showDialog() {
    this.display = true;
  }

  onNotify() {
    this.display = false;
  }

  ngOnInit() {
    this.items = [
      {label: 'Add Task', icon: 'fas fa-plus-square', command: (event) => {
        console.log('Display:' + this.display);
        this.showDialog();
      }},
      {label: 'My Tasks', icon: 'fas fa-tasks', command: (event) => {
        console.log('My Tasks');
      }},
      {label: 'All Tasks', icon: 'fas fa-tasks'},
      {label: 'Filters', icon: 'fas fa-filter'}
    ];
  }

}
