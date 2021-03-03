import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {DpDatePickerModule, ECalendarValue, IDatePickerConfig} from 'ng2-date-picker';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../shared/common.service';
import { Calendar } from '../calendar';
// import * as moment from 'moment';
import * as momentNs from 'moment';
import {Moment} from 'moment';

const moment = momentNs;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
   

  public id: Number;
  public closeResult: string;
  note: any;
  form: FormGroup;
  notes : any = [];
  selectedDate : any;
  config: IDatePickerConfig = {
    format: 'MM/DD/YYYY',
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    openOnFocus: true,
    openOnClick: true,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: moment.locale(),
    hideInputContainer: false,
    returnedValueType: ECalendarValue.String,
    unSelectOnClick: true,
    hideOnOutsideClick: true
  };
  showDateOnly: any;

  constructor(public calendarService: CalendarService, private modalService: NgbModal) { 
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required]),
        note: new FormControl('', Validators.required)
      });
    }

    public onSelect (){
     let dateOnly = new Date(this.selectedDate);
     this.showDateOnly = dateOnly.getDate();
    }

  ngOnInit(): void {
    this.notes = this.calendarService.getAll();
  }

  // Compact form controls use
  get f(){
    return this.form.controls;
  }

  // edit Task
  public editTask(id){
    this.id = id;
    this.note = this.calendarService.find(id);
    this.selectedDate = this.note.createdDate;
    this.onSelect();
        this.form.setValue({title: this.note.title, note: this.note.note});
  }

  public submit(){
    // If Form is invalid
    if(this.form.invalid){
      alert('Please fill full information')
      return;
    }
    this.form.value.createdDate = this.selectedDate;
    if(this.id){
      // In case of edit
      this.notes = this.calendarService.update(this.id, this.form.value);
      this.form.reset();
      this.id = 0;
    }else{
      // In case of Create
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(this.form.value);
      this.notes = this.calendarService.create(notes);
      if(this.notes)
        this.form.reset();
    }
    this.selectedDate = '';
    this.showDateOnly = ''
  }
}