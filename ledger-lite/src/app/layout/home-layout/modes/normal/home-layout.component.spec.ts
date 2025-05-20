import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalHomeLayoutComponent } from './home-layout.component';

describe('HomeLayoutComponent', () => {
  let component: NormalHomeLayoutComponent;
  let fixture: ComponentFixture<NormalHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalHomeLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
