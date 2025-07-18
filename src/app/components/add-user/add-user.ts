import { AfterViewInit, Component, ElementRef, signal, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { JsonPipe, NgFor } from '@angular/common';
import { CustomValidator } from '../../directives/custom-validator';
import { Username } from '../../directives/username';
import { Ranking } from "../ranking/ranking";

@Component({
  selector: 'ng-add-user',
  imports: [FormsModule, JsonPipe, CustomValidator, Username, Ranking],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss'
})
export class AddUser {
  public ranking = signal(5);

  public user: UserModel = {
    firstname: '',
    lastname: ''
  }

  public readonly taxcodeRgx = /^(?:[A-Z][AEIOUX][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/;

  private myForm = viewChild('form');


  public send(e: NgForm) {
    if(e.invalid) {
      this.setDirty(e);
      alert('rivedi i tuoi dati');
      return;
    }

    console.log('send data', e.value);
  }

  public setDirty(frm: NgForm) {
    frm.controls['firstname'].markAllAsTouched();
    // console.log(frm.controls);
  }


  public load() {
    this.user.firstname = 'Pippo';
  }
}
