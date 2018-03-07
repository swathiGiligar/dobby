import { Component, OnInit } from '@angular/core';
import { PTASKService } from '../ptask/ptask.service';
import { PTASK } from '../ptask/ptask.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tasks: PTASK[];
  progressBar = false;

  constructor(private pTaskService: PTASKService,
    private auth: AuthService) { }

  displayAllTasks() {
    this.progressBar = true;
    this.pTaskService.getTasks().subscribe(res => {
      this.tasks = res;
      this.progressBar = false;
    });
  }

  displayMyTasks() {
    this.progressBar = true;
    const user = this.auth.user.firstName + ' ' + this.auth.user.lastName;
    this.pTaskService.myTasks(user).subscribe(res => {
      this.tasks = res;
      this.progressBar = false;
    });
  }

  ngOnInit() {
    this.displayAllTasks();
  }
}
