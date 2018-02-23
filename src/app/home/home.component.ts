import { Component, OnInit } from '@angular/core';
import { PTASKService } from '../ptask/ptask.service';
import { PTASK } from '../ptask/ptask.interface';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tasks: PTASK[];

  constructor(private pTaskService: PTASKService) { }

  displayAllTasks() {
    this.pTaskService.getTasks().subscribe(res => this.tasks = res);
  }

  displayMyTasks() {
    this.pTaskService.myTasks('Varun').subscribe(res => this.tasks = res);
  }

  ngOnInit() {
      this.displayAllTasks();
  }
}
