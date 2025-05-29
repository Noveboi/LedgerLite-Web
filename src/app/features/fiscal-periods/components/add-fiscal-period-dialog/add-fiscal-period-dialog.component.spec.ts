import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFiscalPeriodDialogComponent } from './add-fiscal-period-dialog.component';

describe('AddFiscalPeriodDialogComponent', () => {
  let component: AddFiscalPeriodDialogComponent;
  let fixture: ComponentFixture<AddFiscalPeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFiscalPeriodDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFiscalPeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
