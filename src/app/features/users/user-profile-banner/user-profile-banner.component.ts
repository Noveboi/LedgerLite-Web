import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '../users.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile-banner',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './user-profile-banner.component.html',
  styleUrl: './user-profile-banner.component.css'
})
export class UserProfileBannerComponent {
  private auth = inject(AuthService);

  user = this.auth.user;

  displayRoles = (roles: readonly Role[]) => roles.map(x => x.name).join(', ');

  logout() {
    this.auth.logout();
  }
}
