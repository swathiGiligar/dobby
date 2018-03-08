import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { SelectItem } from 'primeng/components/common/selectitem';
import { User, AuthLevel, UserStatus } from '../auth/security.model';
import { Filter, FilterDesc, PaginateEvent, FilterType } from '../auth/basic.model';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { SecurityService } from '../auth/security.service';
import { UserList } from '../utils/options';
import { PTASKService } from '../ptask/ptask.service';
import { ObjectDetailService } from '../auth/object-detail.service';
import { FormatService } from './format.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

    users: User[] = [];

    readonly ENTRIES_PER_PAGE = 25;

    readonly PAGE_SHOWN = 5;

    from = 0;

    total = 0;

    showFilter = true;

    filter = new Filter();

    filterDesc: FilterDesc[] = [];

    showCreateUserDialog = false;

    constructor(
        public auth: AuthService,
        // private adminSrv: AdminService,
        public fmtSrv: FormatService,
        private msgSrv: MessageService,
        private secSrv: SecurityService,
        private confirmSrv: ConfirmationService,
        private pTaskService: PTASKService,
        private objSrv: ObjectDetailService
      ) { }

    ngOnInit() {
        this.refresh();
        // this.populateFilters();
    }

    refresh() {
        this.pTaskService.getAllUsers().subscribe(
            (ul: UserList) => {
                this.users = ul.data;
                this.total = ul.total;
            },
            err => {
                // this.msgSrv.showError('Failed to featch user information',
                //     'Error! - Manage Users');
            });
    }

    paginate(event: PaginateEvent) {
        this.from = event.first;
        this.refresh();
    }

    deleteUser(user: User) {
        this.confirmSrv.confirm({
            message: 'Do you really want to delete selected user?',
            header: 'Delete User ' + user.firstName + ' ' + user.lastName,
            icon: 'fa fa-question-circle',
            accept: () => {
                this.secSrv.deleteUser(user.id).subscribe(
                    (res: any) => {
                        // this.msgSrv.showSuccess('User deletion successful');
                        // this.refresh()
                    },
                    err => {
                        // this.msgSrv.showError('Failed to delete user');
                    }
                );
            }
        });

    }

    onUserCreationDone() {
        this.showCreateUserDialog = false;
        this.refresh();
    }

    showUserDetails(user: User) {
        this.objSrv.show(user);
    }

    showUserCreationWindow() {
      this.showCreateUserDialog = true;
    }

    // populateFilters() {
    //     this.filterDesc = [
    //         {
    //             name: 'Role',
    //             field: 'auth',
    //             type: FilterType.Value,
    //             data: [
    //                 { value: AuthLevel.Super, label: 'Super' },
    //                 { value: AuthLevel.Admin, label: 'Admin' },
    //                 { value: AuthLevel.Normal, label: 'Normal' },
    //                 { value: AuthLevel.Monitor, label: 'Monitor' },
    //                 { value: AuthLevel.Outsider, label: 'Outsider' },
    //             ],
    //         },
    //         {
    //             name: 'Status',
    //             field: 'state',
    //             type: FilterType.Value,
    //             data: [
    //                 { value: UserStatus.Verified, label: 'Verified' },
    //                 { value: UserStatus.Active, label: 'Active' },
    //                 { value: UserStatus.Disabled, label: 'Disabled' },
    //                 { value: UserStatus.Flagged, label: 'Flagged' },
    //             ],
    //         },
    //     ];
    // }

    // filterChanged(filter: Filter) {
    //     this.from = 0;
    //     this.filter = filter;
    //     this.refresh();
    // }

}
