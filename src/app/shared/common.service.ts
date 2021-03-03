import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Calendar } from '../calendar/calendar';
   
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
  constructor() { }
   
  // Fetch All Calendar
  public getAll(): any {
    return JSON.parse(localStorage.getItem('notes')) || [];
  }
   
  // Create Calendar
  public create(note): Observable<Calendar> {
    localStorage.setItem('notes', JSON.stringify(note));
    return JSON.parse(localStorage.getItem('notes'));
  }  
   
  // Find Calendar by Id
  public find(id): Observable<Calendar> {
    let notes ;
    JSON.parse(localStorage.getItem('notes')).map((data, index) => { 
      if(index == id)
       notes = JSON.parse(localStorage.getItem('notes'))[index];
    })
    return notes;
    
  }
   
  // Update Calendar
  public update(id, note): Observable<Calendar> {
    let notes = JSON.parse(localStorage.getItem('notes'));
    let newObjectKeys: any;
    notes.map((data, index) => { 
      if(index == id){
       // create an array of the keys in the object myMap1
        newObjectKeys = Object.keys(note);
        // loop through the array of object keys
        for (let i = 0; i < newObjectKeys.length; i++) {
          notes[index][newObjectKeys[i]] = note[newObjectKeys[i]];
        }
      }
    })
    localStorage.setItem('notes', JSON.stringify(notes));
    return notes;
  }
}