import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCellEditorComponent } from './account-cell-editor.component';

describe('AccountCellEditorComponent', () => {
  let component: AccountCellEditorComponent;
  let fixture: ComponentFixture<AccountCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCellEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
