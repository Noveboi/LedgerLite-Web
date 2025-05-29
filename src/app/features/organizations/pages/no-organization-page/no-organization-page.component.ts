import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserProfileBannerComponent } from "../../../users/user-profile-banner/user-profile-banner.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-no-organization-page',
  imports: [RouterLink, UserProfileBannerComponent, RouterOutlet, MatButtonModule],
  templateUrl: './no-organization-page.component.html',
  styleUrl: './no-organization-page.component.css'
})
export class NoOrganizationPageComponent {

}
