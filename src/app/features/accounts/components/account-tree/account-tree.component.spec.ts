import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTreeComponent } from './account-tree.component';

describe('AccountTreeComponent', () => {
  let component: AccountTreeComponent;
  let fixture: ComponentFixture<AccountTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
