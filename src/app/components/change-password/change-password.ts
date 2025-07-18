import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';


function samePassword(): ValidatorFn {
  return (ctrl: AbstractControl) => {
    const form = ctrl as FormGroup<{password: FormControl<string>, repeat: FormControl<string>}>;
    const match = form.controls.password.value === form.controls.repeat.value;
    return match ? null : {'PasswordsMustMatch': true};
  }
}

@Component({
  selector: 'ng-change-password',
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {
  private readonly fb = inject(FormBuilder);
  public form = this.fb.group({
  password: ['', Validators.required],
  repeat: ['', Validators.required],
  }, {validators: [samePassword()]});
}
