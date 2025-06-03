import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { JournalEntryLine } from '../../journal-entry.types';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { themeMaterial } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, ICellEditorParams, RowValueChangedEvent } from 'ag-grid-community';
import { JournalEntryService } from '../../services/journal-entry.service';
import { Account, SlimAccount } from '../../../accounts/accounts.types';
import { FiscalPeriodService } from '../../../fiscal-periods/services/fiscal-period.service';
import { MatDialog } from '@angular/material/dialog';
import { AddJournalEntryDialogComponent } from '../add-journal-entry-dialog/add-journal-entry-dialog.component';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../core/permissions/permissions.service';
import { AccountCellEditorComponent } from '../account-cell-editor/account-cell-editor.component';
import { getDateString } from '../../../../core/services/dates/dates.utilities';

@Component({
  selector: 'app-journal-entry-table',
  imports: [MatTableModule, MatIcon, MatButton, AgGridAngular],
  templateUrl: './journal-entry-table.component.html',
  styleUrl: './journal-entry-table.component.scss'
})
export class JournalEntryTableComponent {
  private entryService = inject(JournalEntryService);
  private periodService = inject(FiscalPeriodService);
  private dialog = inject(MatDialog);
  private perms = inject(PermissionsService);
  private grid = viewChild<AgGridAngular>('grid');

  canModify = this.perms.isAllowedToModify;
  entries = input<readonly JournalEntryLine[]>();
  selectedPeriod = this.periodService.selectedPeriod;

  isEditing = signal(false);
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
      cellStyle: { fontWeight: 'bold' },
      cellEditor: AccountCellEditorComponent,
      cellEditorParams: this.accountCellEditorParams,
      onCellClicked: (e) => {
        // e.event?.stopPropagation();
        // const account = e.data?.transferAccount;
        // if (account && (!e.api.getEditingCells() || e.api.getEditingCells().length === 0)) {
        //   this.router.navigate(['home', 'accounts', account.id])
        // }
      }
    },
    { 
      field: 'credit', 
      valueParser: params => Number(params.newValue),
      valueSetter: params => { 
        if (params.oldValue === params.newValue)
          return false;

        params.data.credit = Math.max(0, params.newValue)
        return true;
      }
    },
    { 
      field: 'debit',
      valueSetter: params => { 
        if (params.oldValue === params.newValue)
          return false;

        params.data.debit = Math.max(0, params.newValue)
        return true;
      }
    }
  ];

  defaultColumnDefinitions: ColDef<JournalEntryTableRow> = {
    flex: 1,
    editable: this.canModify()
  };

  onRowValueChanged(e: RowValueChangedEvent) {
    if (!e.data) {
      throw new Error('Row data is undefined.')
    }

    const row = e.data as JournalEntryTableRow;
    
    if (row.credit < 0 || row.debit < 0 || (row.credit > 0 && row.debit > 0)) {
      throw new Error('Invalid credit/debit state.');
    }

    console.log('awd')

    this.entryService.updateJournalEntry({
      lineId: row.lineId,
      credit: row.credit,
      debit: row.debit,
      description: row.description,
      transferAccountId: row.transferAccount.id,
      occursAt: getDateString(row.occursAt)
    })
  }

  openRecordEntryDialog() {
    this.dialog.open(AddJournalEntryDialogComponent, {
      disableClose: true
    });
  }

  private accountCellEditorParams(params: ICellEditorParams<JournalEntryTableRow>) {
    return {
      selectedAccount: params.data.transferAccount
    };
  }

  protected applyChanges() {
    this.grid()?.api.stopEditing(false);
  }

  protected discardChanges() {
    this.grid()?.api.stopEditing(true);
  }

  protected onStartEditing() {
    this.isEditing.set(true);
  }

  protected onStopEditing() {
    this.isEditing.set(false);
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
