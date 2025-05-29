import { Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AppFormComponent } from '../../../../core/types/component.types';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CreateJournalEntryRequest } from '../../journal-entry.requests';
import { ChartOfAccountsService } from '../../../accounts/services/chart-of-accounts.service';
import { FiscalPeriodService } from '../../../fiscal-periods/services/fiscal-period.service';
import { getDateString } from '../../../../core/services/dates/dates.utilities';
import { SlimAccount } from '../../../accounts/accounts.types';
import { EntryValidators } from '../../validation/journal-entry.validation';

@Component({
  selector: 'app-add-journal-entry-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatRadioModule, MatAutocompleteModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-journal-entry-form.component.html',
  styleUrl: './add-journal-entry-form.component.css'
})
export class AddJournalEntryFormComponent implements AppFormComponent {
  private accountService = inject(ChartOfAccountsService);
  private periodService = inject(FiscalPeriodService);

  transferAccountCreditOrDebit = signal<'credit' | 'debit'>('debit');
  currentAccount = this.accountService.selectedAccount;
  accounts = this.accountService.getAllAccounts().filter(account => account.id !== this.currentAccount()?.id);
  validSubmit = output<CreateJournalEntryRequest>();

  entryGroup = new FormGroup({
    referenceNumber: new FormControl('', [Validators.required]),
    occursAt: new FormControl<Date | null>(null, [Validators.required]),
    description: new FormControl(''),
    amount: new FormControl(0, [Validators.min(0)]),
    creditOrDebit: new FormControl('credit'),
    transferAccount: new FormControl<SlimAccount | null>(null, [
      Validators.required, 
      EntryValidators.onlyExistingAccounts(this.accounts)])
  });

  constructor() {
    this.entryGroup.valueChanges.subscribe(value => {
      if (value.creditOrDebit) {
        this.transferAccountCreditOrDebit.set(value.creditOrDebit === 'credit' ? 'debit' : 'credit');
      }
    })
  }

  displayFn = (account: SlimAccount) => account && account.name ? account.name : '';
  
  submit() {
    const period = this.periodService.selectedPeriod();
    const currentAccount = this.currentAccount();

    if (this.entryGroup.invalid || !currentAccount || !period) {
      console.log(this.entryGroup.value);
      return;
    }
    
    const form = this.entryGroup.value;

    this.validSubmit.emit({
      fiscalPeriodId: period.id,
      creditAccountId: form.creditOrDebit === 'credit' ? currentAccount.id : form.transferAccount?.id ?? '',
      debitAccountId: form.creditOrDebit === 'debit' ? currentAccount.id : form.transferAccount?.id ?? '',
      amount: form.amount ?? -1,
      description: form.description ?? '',
      occursAt: getDateString(form.occursAt ?? new Date()),
      referenceNumber: form.referenceNumber ?? ''
    })
  }
}
