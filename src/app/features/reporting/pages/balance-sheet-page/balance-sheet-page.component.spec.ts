import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetPageComponent } from './balance-sheet-page.component';

describe('BalanceSheetPageComponent', () => {
  let component: BalanceSheetPageComponent;
  let fixture: ComponentFixture<BalanceSheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceSheetPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceSheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
