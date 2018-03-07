import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Http , HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import {ContextMenuModule} from 'primeng/contextmenu';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {DataScrollerModule} from 'primeng/datascroller';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {GrowlModule} from 'primeng/growl';
import {MessageService} from 'primeng/components/common/messageservice';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PTASKService} from './ptask/ptask.service';
import { PtaskComponent } from './ptask/ptask.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TaskAdditionComponent } from './task-addition/task-addition.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {PasswordComponent} from './password/password.component';
import {UserCreateComponent} from './user-create/user-create.component';
import { SecurityService } from './auth/security.service';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: LayoutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PtaskComponent,
    SideBarComponent,
    TaskAdditionComponent,
    LoginComponent,
    LayoutComponent,
    PasswordComponent,
    UserCreateComponent,
    VerifyAccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:4200']
      },
              }),

    MenubarModule,
    ButtonModule,
    MenuModule,
    DataScrollerModule,
    PanelMenuModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    InputTextareaModule,
    GrowlModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    PTASKService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  },
  AuthService,
  SecurityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function tokenGetter() {
  return localStorage.getItem('token');
}
