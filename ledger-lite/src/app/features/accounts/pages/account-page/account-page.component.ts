import { Component, inject, Input } from '@angular/core';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { JournalEntryTableComponent } from "../../../journal-entries/components/journal-entry-table/journal-entry-table.component";
import { AccountHeadingComponent } from "../../components/account-heading/account-heading.component";
import { FiscalPeriodService } from '../../../fiscal-periods/services/fiscal-period.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-account-page',
  imports: [JournalEntryTableComponent, AccountHeadingComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
  private accountService = inject(ChartOfAccountsService);
  private periodService = inject(FiscalPeriodService);
  account = this.accountService.selectedAccount;

  constructor() {
    this.periodService.selectedPeriod$.pipe(takeUntilDestroyed()).subscribe(period => {
      if (period) {
        this.accountService.refreshSelectedAccount()
      }
    })
  }
  
  @Input()
  set id(value: string) {
    this.accountService.getAccount(value)
  }
}
