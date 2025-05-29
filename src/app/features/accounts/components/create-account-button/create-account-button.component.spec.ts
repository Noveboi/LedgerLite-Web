import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountButtonComponent } from './create-account-button.component';

describe('CreateAccountButtonComponent', () => {
  let component: CreateAccountButtonComponent;
  let fixture: ComponentFixture<CreateAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
