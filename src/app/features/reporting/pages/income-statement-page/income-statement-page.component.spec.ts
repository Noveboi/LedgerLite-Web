import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatementPageComponent } from './income-statement-page.component';

describe('IncomeStatementPageComponent', () => {
  let component: IncomeStatementPageComponent;
  let fixture: ComponentFixture<IncomeStatementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeStatementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeStatementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
