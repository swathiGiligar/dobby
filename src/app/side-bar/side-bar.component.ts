import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Active', icon: 'fas fa-hourglass-half'},
      {label: 'Up for Review', icon: 'fa-eraser'},
      {label: 'Completed', icon: 'fa-check'}
    ];
  }

}
