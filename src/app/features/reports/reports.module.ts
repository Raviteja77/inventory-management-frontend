import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ReportsModule { }
