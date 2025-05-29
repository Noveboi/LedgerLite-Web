import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountButtonGroupComponent } from './account-button-group.component';

describe('AccountButtonGroupComponent', () => {
  let component: AccountButtonGroupComponent;
  let fixture: ComponentFixture<AccountButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountButtonGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
