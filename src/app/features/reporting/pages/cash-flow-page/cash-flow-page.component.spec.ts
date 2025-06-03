import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowPageComponent } from './cash-flow-page.component';

describe('CashFlowPageComponent', () => {
  let component: CashFlowPageComponent;
  let fixture: ComponentFixture<CashFlowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashFlowPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
