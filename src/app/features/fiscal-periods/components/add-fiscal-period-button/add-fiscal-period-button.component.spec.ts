import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFiscalPeriodButtonComponent } from './add-fiscal-period-button.component';

describe('AddFiscalPeriodButtonComponent', () => {
  let component: AddFiscalPeriodButtonComponent;
  let fixture: ComponentFixture<AddFiscalPeriodButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFiscalPeriodButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFiscalPeriodButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
