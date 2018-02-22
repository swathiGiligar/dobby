import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http , HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PtaskComponent,
    SideBarComponent,
    TaskAdditionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    HttpClientModule,
    HttpModule,
    FormsModule,

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
