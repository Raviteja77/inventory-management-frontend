import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomDirectivesModule } from 'src/app/custom-directives/custom-directives.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CustomDirectivesModule,
    RouterModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
