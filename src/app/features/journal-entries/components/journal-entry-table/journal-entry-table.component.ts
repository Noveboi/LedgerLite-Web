import { Component, computed, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { JournalEntryLine } from '../../journal-entry.types';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { themeMaterial } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, RowValueChangedEvent } from 'ag-grid-community';
import { JournalEntryService } from '../../services/journal-entry.service';
import { Account, SlimAccount } from '../../../accounts/accounts.types';
import { ChartOfAccountsService } from '../../../accounts/services/chart-of-accounts.service';
import { FiscalPeriodService } from '../../../fiscal-periods/services/fiscal-period.service';
import { MatDialog } from '@angular/material/dialog';
import { AddJournalEntryDialogComponent } from '../add-journal-entry-dialog/add-journal-entry-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-entry-table',
  imports: [MatTableModule, MatIcon, MatButton, AgGridAngular],
  templateUrl: './journal-entry-table.component.html',
  styleUrl: './journal-entry-table.component.scss'
})
export class JournalEntryTableComponent {
  private entryService = inject(JournalEntryService);
  private accountService = inject(ChartOfAccountsService);
  private periodService = inject(FiscalPeriodService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  entries = input<readonly JournalEntryLine[]>();
  selectedPeriod = this.periodService.selectedPeriod;

  private currentAccount = computed(() => {
    const current = this.accountService.selectedAccount();
    if (!current) {
      throw new Error('No selected account.')
    }

    return current as Account;
  });

  theme = themeMaterial;

  rows = computed<JournalEntryTableRow[]>(() => this.entries()?.map<JournalEntryTableRow>(line => ({
    credit: line.credit,
    debit: line.debit,
    description: line.entryDescription,
    occursAt: new Date(line.occursAt),
    transferAccount: line.transferAccount,
    entryId: line.entryId,
    lineId: line.id
  })) ?? [])

  columnDefinitions: ColDef<JournalEntryTableRow>[] = [
    { field: 'occursAt' },
    { field: 'description' },
    { 
      field: 'transferAccount', 
      valueGetter: (entry) => entry.data?.transferAccount?.name ?? '',
      cellStyle: { fontWeight: 'bold', cursor: 'pointer' },
      onCellClicked: (e) => {
        e.event?.stopPropagation();
        const account = e.data?.transferAccount;
        if (account && (!e.api.getEditingCells() || e.api.getEditingCells().length === 0)) {
          this.router.navigate(['accounts', account.id])
        }
      }
    },
    { field: 'credit' },
    { field: 'debit' }
  ];

  defaultColumnDefinitions: ColDef<JournalEntryTableRow> = {
    flex: 1,
    editable: true
  };

  onRowValueChanged(e: RowValueChangedEvent) {
    if (!e.data) {
      throw new Error('Row data is undefined.')
    }

    const row = e.data as JournalEntryTableRow;
    
    if (row.credit < 0 || row.debit < 0 || (row.credit > 0 && row.debit > 0)) {
      throw new Error('Invalid credit/debit state.');
    }

    let creditAccountId: string;
    let debitAccountId: string;

    if (row.credit > 0) {
      creditAccountId = this.currentAccount().id;
      debitAccountId = row.transferAccount.id;
    } else {
      creditAccountId = row.transferAccount.id;
      debitAccountId = this.currentAccount().id;
    }

    this.entryService.updateJournalEntry({
      entryId: row.entryId,
      lineId: row.lineId,
      credit: row.credit,
      debit: row.debit,
      entryDescription: row.description,
      transferAccountId: row.transferAccount.id
    })
  }

  openRecordEntryDialog() {
    this.dialog.open(AddJournalEntryDialogComponent, {
      disableClose: true
    });
  }
}

interface JournalEntryTableRow {
  entryId: string,
  lineId: string,
  occursAt: Date,
  description: string,
  transferAccount: SlimAccount,
  credit: number,
  debit: number
}
