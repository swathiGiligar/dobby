import { Component} from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  msgs: Message[] = [];
  sub: Subscription;

  constructor(private messageService: MessageService) {
    this.sub = this.messageService.messageObserver.subscribe((msg: Message) => {
  });
  }

}
