import { Component, computed, input, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { JournalEntryLine } from '../journal-entry.types';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

interface JournalEntryTableRow {
  occursAt: Date,
  description: string,
  transferAccount: string,
  credit: number,
  debit: number
}

@Component({
  selector: 'app-journal-entry-table',
  imports: [MatTableModule, MatIcon, MatButton],
  templateUrl: './journal-entry-table.component.html',
  styleUrl: './journal-entry-table.component.scss'
})
export class JournalEntryTableComponent {
  entries = input<readonly JournalEntryLine[]>();

  rows = computed<readonly JournalEntryTableRow[]>(() => {
    return this.entries()?.map<JournalEntryTableRow>(entry => ({
      credit: entry.credit,
      debit: entry.debit,
      description: entry.entryDescription,
      occursAt: new Date(entry.occursAt),
      transferAccount: 'Placeholder'
    })) ?? [];
  })

  columns = ['occursAt', 'description', 'transferAccount', 'credit', 'debit']
}
