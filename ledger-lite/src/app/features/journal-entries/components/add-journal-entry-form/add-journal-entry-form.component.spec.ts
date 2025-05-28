import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalEntryFormComponent } from './add-journal-entry-form.component';

describe('AddJournalEntryFormComponent', () => {
  let component: AddJournalEntryFormComponent;
  let fixture: ComponentFixture<AddJournalEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJournalEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJournalEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
