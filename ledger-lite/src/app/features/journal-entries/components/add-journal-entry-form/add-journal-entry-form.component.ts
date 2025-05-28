import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-journal-entry-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-journal-entry-form.component.html',
  styleUrl: './add-journal-entry-form.component.css'
})
export class AddJournalEntryFormComponent {

}
