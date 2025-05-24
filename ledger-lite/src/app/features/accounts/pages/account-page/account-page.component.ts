import { Component, inject, Input } from '@angular/core';
import { ChartOfAccountsService } from '../../services/chart-of-accounts.service';
import { JournalEntryTableComponent } from "../../../journal-entries/journal-entry-table/journal-entry-table.component";
import { AccountHeadingComponent } from "../../components/account-heading/account-heading.component";

@Component({
  selector: 'app-account-page',
  imports: [JournalEntryTableComponent, AccountHeadingComponent],
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
