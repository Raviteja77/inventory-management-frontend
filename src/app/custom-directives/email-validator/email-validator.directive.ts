import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive } from '@angular/core';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const length = control.value?.length;
    const atRate = control.value?.indexOf('@');
    const dot = control.value?.indexOf('.');
    return dot === -1 ||
      dot === length ||
      length - dot < 2 ||
      atRate === -1 ||
      atRate === length ||
      length - atRate < 4
      ? { invalidEmail: true }
      : null;
  };
}

@Directive({
  selector: '[appEmailvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return emailValidator()(control);
  }
}