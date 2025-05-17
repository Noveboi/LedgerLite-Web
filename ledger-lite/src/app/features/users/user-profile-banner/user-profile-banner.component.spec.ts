import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBannerComponent } from './user-profile-banner.component';

describe('UserProfileBannerComponent', () => {
  let component: UserProfileBannerComponent;
  let fixture: ComponentFixture<UserProfileBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
