import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {DataScrollerModule} from 'primeng/datascroller';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {PTASKService} from './ptask/ptask.service';
import { Http , HttpModule} from '@angular/http';
import { PtaskComponent } from './ptask/ptask.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PtaskComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    MenubarModule,
    ButtonModule,
    MenuModule,
    DataScrollerModule,
    HttpModule,
    PanelMenuModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
  ],
  providers: [
    PTASKService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
