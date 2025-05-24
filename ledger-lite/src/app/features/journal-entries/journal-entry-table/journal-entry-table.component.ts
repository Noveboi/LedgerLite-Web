import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { JournalEntryLine } from '../journal-entry.types';

@Component({
  selector: 'app-journal-entry-table',
  imports: [MatTableModule],
  templateUrl: './journal-entry-table.component.html',
  styleUrl: './journal-entry-table.component.css'
})
export class JournalEntryTableComponent {
  test: JournalEntryLine[] = [
    {id: '', entryId: '', occursAt: '2025-05-30', entryDescription: 'Hello!', credit: 0, debit: 10},
    {id: '', entryId: '', occursAt: '2025-05-31', entryDescription: 'Hello 2!', credit: 100, debit: 0},
  ]

  columns = ['occursAt', 'entryDescription', 'credit', 'debit']
}
