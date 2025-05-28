import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalEntryDialogComponent } from './add-journal-entry-dialog.component';

describe('AddJournalEntryDialogComponent', () => {
  let component: AddJournalEntryDialogComponent;
  let fixture: ComponentFixture<AddJournalEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJournalEntryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJournalEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
