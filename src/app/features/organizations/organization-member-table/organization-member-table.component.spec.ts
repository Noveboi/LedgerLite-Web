import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberTableComponent } from './organization-member-table.component';

describe('OrganizationMemberTableComponent', () => {
  let component: OrganizationMemberTableComponent;
  let fixture: ComponentFixture<OrganizationMemberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationMemberTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
