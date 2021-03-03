import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DpDatePickerModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
