import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrganizationPageComponent } from './no-organization-page.component';

describe('NoOrganizationPageComponent', () => {
  let component: NoOrganizationPageComponent;
  let fixture: ComponentFixture<NoOrganizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoOrganizationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoOrganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
