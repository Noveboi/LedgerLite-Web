import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from "../../../components/button/button.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile-banner',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './user-profile-banner.component.html',
  styleUrl: './user-profile-banner.component.css'
})
export class UserProfileBannerComponent {
  private auth = inject(AuthService);

  user = this.auth.user;

  logout() {
    this.auth.logout();
  }
}
