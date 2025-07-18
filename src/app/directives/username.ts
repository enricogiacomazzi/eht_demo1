import { Directive, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[ngUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: Username,
      multi: true
    },
    UserService
  ]
})
export class Username implements AsyncValidator {

  private readonly userService = inject(UserService);

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const {value} = control as FormControl<string>;
    return this.userService.GetUsernames().pipe(
      map(names => (names ?? []).includes(value)),
      map(match => match ? {'usernameAlreadyUsed': true} : null))
  }
}
