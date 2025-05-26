import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalPeriodSelectComponent } from './fiscal-period-select.component';

describe('FiscalPeriodSelectComponent', () => {
  let component: FiscalPeriodSelectComponent;
  let fixture: ComponentFixture<FiscalPeriodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiscalPeriodSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalPeriodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
