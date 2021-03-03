import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
  
import { CalendarModule } from './calendar/calendar.module';
  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }