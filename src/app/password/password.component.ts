import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { PasswordSetMode } from '../auth/security.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

    @Input('mode') mode: PasswordSetMode = PasswordSetMode.Reset;

    @Input('userID') userID = '';

    // tslint:disable-next-line:no-output-on-prefix
    @Output('onSubmit') onSubmit = new EventEmitter();

    constructor(
        private msgSrv: MessageService) {

    }

    ngOnInit() {
    }

    onFormSubmit(f: any) {
        this.onSubmit.emit({
            userID: this.userID,
            data: f.value,
        });
    }

    passwordValid(f: any) {
        console.log(f);
        return f.value.password === f.value.confirm;
    }

    isMode(mode: string): boolean {
        return mode === <string>this.mode;
    }
}
