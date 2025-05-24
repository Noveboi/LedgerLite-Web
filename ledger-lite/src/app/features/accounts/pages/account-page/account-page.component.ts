import { Component, inject, Input, input, InputSignal } from '@angular/core';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';

@Component({
  selector: 'app-account-page',
  imports: [],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
  private accountService = inject(ChartOfAccountsService);
  account = this.accountService.selectedAccount;
  
  @Input()
  set id(value: string) {
    this.accountService.getAccount(value)
  }
}
