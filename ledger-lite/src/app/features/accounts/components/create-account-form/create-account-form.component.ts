import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { accountTypes } from '../../accounts.types';
import { currencies } from '../../../../types/core.types';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ButtonComponent } from "../../../../components/button/button.component";

@Component({
  selector: 'app-create-account-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, ButtonComponent],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.css'
})
export class CreateAccountFormComponent {
  accountGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    isPlaceholder: new FormControl(false),
    description: new FormControl('')
  })

  accountTypes = accountTypes;
  currencies = currencies;

  createAccount() {
    console.log(this.accountGroup.value)
  }
}
