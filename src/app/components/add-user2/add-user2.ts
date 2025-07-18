import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Username } from '../../directives/username';
import { Ranking } from "../ranking/ranking";

interface FormState {
  firstname: string | undefined,
  lastname: string | undefined,
  rows: string[]
}


@Component({
  selector: 'ng-add-user2',
  providers: [Username],
  imports: [ReactiveFormsModule, Ranking],
  templateUrl: './add-user2.html',
  styleUrl: './add-user2.scss'
})
export class AddUser2 {
  private readonly fb = inject(FormBuilder);

  private readonly username = inject(Username);
  
  public readonly myForm = this.fb.group({
    firstname: ['ciao', Validators.required],
    lastname: ['Blue', [Validators.required, Validators.minLength(3)]],
    ranking: [2],
    rows: this.fb.array([])
  });

  public readonly search = this.fb.control<string>('');

  private userService = inject(UserService);

  public users = toSignal(this.search.valueChanges.pipe(
        debounceTime(500), 
        distinctUntilChanged(),
        switchMap(name => this.userService.SearchUsers(name ?? ''))
      ));


  constructor() {
    this.myForm.statusChanges.subscribe(x => {
      console.log('status', x);
    })
  }



  public addRow() {
    this.myForm.controls.rows.push(this.fb.control<string>(''));
  }


  public send() {
    console.log('send to server', this.myForm.value);
  }

  public tmp() {
    this.myForm.controls['lastname'].addValidators(Validators.maxLength(5));
    this.myForm.controls['lastname'].updateValueAndValidity();
    // this.myForm.controls['firstname'].patchValue('Vessicchio');
  }


  // public readonly myForm = new FormGroup(
  //   {
  //     firstname: new FormControl<string>('Ciccio'),
  //     lastname: new FormControl<string>('Verdi')
  //   }
  // )
}
