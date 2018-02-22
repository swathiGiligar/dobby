import { Component } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  msgs: Message[] = [];
  sub: Subscription;

  constructor(private messageService: MessageService) {
    this.showSuccessMessage();
  }

  showSuccessMessage() {
    this.sub = this.messageService.messageObserver.subscribe((msg: Message) => {
      console.log(msg);
      this.msgs.push(msg);
  });
}
}
