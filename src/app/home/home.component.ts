import { Component, OnInit } from '@angular/core';
import { PTASKService } from '../ptask/ptask.service';
import { PTASK } from '../ptask/ptask.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tasks: PTASK[];

  constructor(private pTaskService: PTASKService) { }

  ngOnInit() {
      this.pTaskService.getTasks().then(tasks => this.tasks = tasks);
  }
}
