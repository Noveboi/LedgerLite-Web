import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousLayoutComponent } from './anonymous-layout.component';

describe('AnonymousLayoutComponent', () => {
  let component: AnonymousLayoutComponent;
  let fixture: ComponentFixture<AnonymousLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonymousLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymousLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
