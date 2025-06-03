import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatementTableComponent } from './income-statement-table.component';

describe('IncomeStatementTableComponent', () => {
  let component: IncomeStatementTableComponent;
  let fixture: ComponentFixture<IncomeStatementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeStatementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeStatementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
