import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFiscalPeriodFormComponent } from './add-fiscal-period-form.component';

describe('AddFiscalPeriodFormComponent', () => {
  let component: AddFiscalPeriodFormComponent;
  let fixture: ComponentFixture<AddFiscalPeriodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFiscalPeriodFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFiscalPeriodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
