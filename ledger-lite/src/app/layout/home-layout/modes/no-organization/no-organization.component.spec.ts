import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrganizationComponent } from './no-organization.component';

describe('NoOrganizationComponent', () => {
  let component: NoOrganizationComponent;
  let fixture: ComponentFixture<NoOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoOrganizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
