import { Component } from '@angular/core';
import { UserProfileBannerComponent } from "../../../../features/users/user-profile-banner/user-profile-banner.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-no-organization',
  imports: [UserProfileBannerComponent, RouterOutlet],
  templateUrl: './no-organization.component.html',
  styleUrl: './no-organization.component.scss'
})
export class NoOrganizationComponent {

}
