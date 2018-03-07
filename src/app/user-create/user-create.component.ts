import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { UserCreateMode, User, AuthLevel } from '../auth/security.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { SecurityService } from '../auth/security.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

    readonly AUTH_LEVELS_ITEMS = [
        // { label: "Super", value: 0 },
        { label: 'Normal', value: 2 },
        { label: 'Admin', value: 1 },
        { label: 'Monitor', value: 3 },
        { label: 'Outsider', value: 4 },
    ];

    password = '';

    confirm = '';

    @Input('mode') mode: UserCreateMode = UserCreateMode.Create;

    // tslint:disable-next-line:no-output-on-prefix
    @Output('onFinished') onFinished = new EventEmitter();

    constructor(private secSrv: SecurityService,
        private msgSrv: MessageService) {

    }

    ngOnInit() {
    }

    passwordValid(): boolean {
        return this.password !== '' && this.password === this.confirm;
    }

    registerUser(f: any) {
        const user = <User>f.value;
        if (!user.auth) {
            user.auth = AuthLevel.Normal;
        }
        if (this.password === this.confirm) {
            this.secSrv.registerUser(user, this.password).subscribe(
                res => {
                    this.msgSrv.add({
                      severity: 'success',
                      summary: 'Registration successful, please'
                      + ' confirm the EMail'
                    });
                    this.onFinished.emit({ result: true, user: user });
                },
                err => {
                  this.msgSrv.add({
                    severity: 'error',
                    summary: 'Registration failed'
                  });
                    this.onFinished.emit({ result: false, user: user });
                });

        } else {
            this.msgSrv.add({
              severity: 'error',
              summary: 'Passwords don\'t match'
            });
        }

    }

    createUser(f: any) {
        const user = <User>f.value;
        if (!user.auth) {
            user.auth = AuthLevel.Normal;
        }
        this.secSrv.createUser(user).subscribe(
            res => {
                this.msgSrv.add({
                      severity: 'success',
                      summary: 'Creation successful. '
                      + 'account will be active once user confirms EMail'
                    });
                this.onFinished.emit({ result: true, user: user });
            },
            err => {
                this.msgSrv.add({
                  severity: 'error',
                  summary: 'User creation failed'
                });
                this.onFinished.emit({ result: false, user: user });
            });

    }

}
