import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingMenuComponent } from './reporting-menu.component';

describe('ReportingMenuComponent', () => {
  let component: ReportingMenuComponent;
  let fixture: ComponentFixture<ReportingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
