import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateAccountRequest } from '../../accounts.requests';
import { AppFormComponent } from '../../../../core/types/component.types';
import { accountTypes, currencies, expenseTypes } from '../../accounts.enumeration';
import { SlimAccount } from '../../accounts.types';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-create-account-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.css'
})
export class CreateAccountFormComponent implements AppFormComponent {
  parentAccount = input<SlimAccount>();
  validSubmit = output<CreateAccountRequest>();

  accountGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    type: new FormControl(''),
    currency: new FormControl(''),
    isPlaceholder: new FormControl(false),
    description: new FormControl(''),
    expenseType: new FormControl<string | null>(null)
  })

  accountTypes = accountTypes;
  currencies = currencies;
  expenseTypes = expenseTypes;

  submit() {
    if (this.accountGroup.invalid)
      return;

    const form = this.accountGroup.value;
    const parent = this.parentAccount();

    this.validSubmit.emit({
      name: form.name ?? '',
      number: form.number ?? '',
      description: form.description ?? null,
      type: this.valueOr(form.type, parent?.type ?? ''),
      currency: this.valueOr(form.currency, parent?.currency ?? ''),
      isPlaceholder: form.isPlaceholder ?? false,
      parentId: parent?.id ?? null,
      expenseType: form.expenseType ?? null
    })
  }

  private valueOr(value: string | null | undefined, def: string): string {
    return !value || value === ''
      ? def
      : value;
  }
}
