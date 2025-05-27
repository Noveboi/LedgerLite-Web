import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { accountTypes, SlimAccount } from '../../accounts.types';
import { currencies } from '../../../../types/core.types';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';

@Component({
  selector: 'app-create-account-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.css'
})
export class CreateAccountFormComponent {
  private accountService = inject(ChartOfAccountsService);
  parentAccount = input<SlimAccount>();

  accountGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    type: new FormControl(''),
    currency: new FormControl(''),
    isPlaceholder: new FormControl(false),
    description: new FormControl('')
  })

  accountTypes = accountTypes;
  currencies = currencies;

  createAccount() {
    if (this.accountGroup.invalid)
      return;

    const form = this.accountGroup.value;

    const parent = this.parentAccount();

    this.accountService.createAccount({
      name: form.name ?? '',
      number: form.number ?? '',
      description: form.description ?? null,
      type: this.valueOr(form.type, parent?.type ?? ''),
      currency: this.valueOr(form.currency, parent?.currency ?? ''),
      isPlaceholder: form.isPlaceholder ?? false,
      parentId: parent?.id ?? null
    })
  }

  private valueOr(value: string | null | undefined, def: string): string {
    return !value || value === ''
      ? def
      : value;
  }
}
