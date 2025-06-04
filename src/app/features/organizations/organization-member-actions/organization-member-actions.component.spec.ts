import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberActionsComponent } from './organization-member-actions.component';

describe('OrganizationMemberActionsComponent', () => {
  let component: OrganizationMemberActionsComponent;
  let fixture: ComponentFixture<OrganizationMemberActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationMemberActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
