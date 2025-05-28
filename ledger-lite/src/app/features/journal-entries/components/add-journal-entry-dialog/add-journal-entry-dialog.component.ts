import { Component, inject } from '@angular/core';
import { CreateJournalEntryRequest } from '../../journal-entry.requests';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddJournalEntryFormComponent } from "../add-journal-entry-form/add-journal-entry-form.component";
import { ExternalSubmitDirective } from '../../../../directives/external-submit.directive';
import { JournalEntryService } from '../../services/journal-entry.service';
import { ChartOfAccountsService } from '../../../accounts/services/chart-of-accounts.service';

@Component({
  selector: 'app-add-journal-entry-dialog',
  imports: [MatDialogModule, MatButtonModule, AddJournalEntryFormComponent, ExternalSubmitDirective],
  templateUrl: './add-journal-entry-dialog.component.html',
  styleUrl: './add-journal-entry-dialog.component.css'
})
export class AddJournalEntryDialogComponent {
  private entryService = inject(JournalEntryService);
  private accountService = inject(ChartOfAccountsService);
  private dialogRef = inject(MatDialogRef);
  
  createEntry(request: CreateJournalEntryRequest) {
    this.entryService.addJournalEntry(request).subscribe(() => this.accountService.refreshSelectedAccount());
    this.dialogRef.close();
  }
}
