import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { JournalEntryLine } from '../journal-entry.types';

@Component({
  selector: 'app-journal-entry-table',
  imports: [MatTableModule],
  templateUrl: './journal-entry-table.component.html',
  styleUrl: './journal-entry-table.component.css'
})
export class JournalEntryTableComponent {
  entries = input<readonly JournalEntryLine[]>();

  columns = ['occursAt', 'entryDescription', 'credit', 'debit']
}
