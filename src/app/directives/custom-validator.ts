import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ngCustomValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidator,
      multi: true
    }
  ] 
})
export class CustomValidator implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const {value} = control as FormControl<string>;
    const match = (value ?? '').includes('666');
    return match ? {'customValidation': true} : null
  }

}
