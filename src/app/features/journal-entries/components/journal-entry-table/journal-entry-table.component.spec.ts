import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryTableComponent } from './journal-entry-table.component';

describe('JournalEntryTableComponent', () => {
  let component: JournalEntryTableComponent;
  let fixture: ComponentFixture<JournalEntryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalEntryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
