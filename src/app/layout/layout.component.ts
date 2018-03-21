import { Component} from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  msgs: Message[] = [];
  sub: Subscription;
  loggedInUser: string;

  constructor(private messageService: MessageService,
      private auth: AuthService,
      public router: Router) {
    this.sub = this.messageService.messageObserver.subscribe((msg: Message) => {
  });
  this.loggedInUser = this.auth.user.firstName + ' ' + this.auth.user.lastName;
  }

  logout() {
      this.auth.logout();
  }

  home() {
    this.router.navigate(['/home']);
  }
}
