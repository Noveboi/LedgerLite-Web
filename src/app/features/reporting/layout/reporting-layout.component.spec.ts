import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingLayoutComponent } from './reporting-layout.component';

describe('ReportingLayoutComponent', () => {
  let component: ReportingLayoutComponent;
  let fixture: ComponentFixture<ReportingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
