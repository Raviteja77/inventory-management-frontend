import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from './email-validator/email-validator.directive';
import { ToggleDirective } from './toggle/toggle.directive';

const listOfDirectives = [EmailValidatorDirective, ToggleDirective]

@NgModule({
  declarations: listOfDirectives,
  imports: [
    CommonModule
  ],
  exports: listOfDirectives,
})
export class CustomDirectivesModule { }
