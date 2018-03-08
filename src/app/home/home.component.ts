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
  taskView = true;
  userView = false;

  constructor(private pTaskService: PTASKService,
    private auth: AuthService) { }

  displayAllTasks() {
    this.showTaskView();
    this.progressBar = true;
    this.pTaskService.getTasks().subscribe(res => {
      this.tasks = res;
      this.progressBar = false;
    });
  }

  displayMyTasks() {
    this.showTaskView();
    this.progressBar = true;
    const user = this.auth.user.firstName + ' ' + this.auth.user.lastName;
    this.pTaskService.myTasks(user).subscribe(res => {
      this.tasks = res;
      this.progressBar = false;
    });
  }

  showUserView() {
    this.taskView = false;
    this.userView = true;
  }

  showTaskView() {
    this.taskView = true;
    this.userView = false;
  }

  ngOnInit() {
    this.displayMyTasks();
  }
}
