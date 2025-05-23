import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccountButtonComponent } from './remove-account-button.component';

describe('RemoveAccountButtonComponent', () => {
  let component: RemoveAccountButtonComponent;
  let fixture: ComponentFixture<RemoveAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveAccountButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
