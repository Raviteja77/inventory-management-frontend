import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    VendorsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class VendorsModule { }
